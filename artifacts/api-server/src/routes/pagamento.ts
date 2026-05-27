import { Router } from "express";
import { desc } from "drizzle-orm";
import { db, paymentsTable, type Payment as PaymentRow } from "@workspace/db";
import { logger } from "../lib/logger";

const router = Router();

// Use sandbox token as fallback when PAGBANK_TOKEN is not set
const SANDBOX_TOKEN = "616907f3-b6e9-4a08-a1ac-1446b45fd970e1b63eca43e593bc5955d3483ffe3f85dd94-f53b-4daa-87f9-c98bdfb871ae";
const PAGBANK_TOKEN = process.env.PAGBANK_TOKEN || SANDBOX_TOKEN;
const IS_SANDBOX = !process.env.PAGBANK_TOKEN;
const PAGBANK_BASE = IS_SANDBOX
  ? "https://sandbox.api.pagseguro.com"
  : "https://api.pagseguro.com";

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL || "";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dellaretti@admin2024";

type PaymentRecord = PaymentRow;

async function notifyDiscord(body: any, result: any) {
  if (!DISCORD_WEBHOOK) return;
  try {
    const planLabel = body.plan?.name || "-";
    const planPrice = body.plan?.price
      ? `R$ ${(body.plan.price / 100).toFixed(2).replace(".", ",")}`
      : "-";

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Dellaretti Pagamentos",
        embeds: [{
          title: "💳 Novo Checkout Criado",
          color: 0x2e6b4d,
          fields: [
            { name: "Nome", value: body.name || "-", inline: true },
            { name: "Email", value: body.email || "-", inline: true },
            { name: "Plano", value: planLabel, inline: true },
            { name: "Valor", value: planPrice, inline: true },
            { name: "Checkout ID", value: result?.id || "-", inline: false },
            { name: "Ambiente", value: IS_SANDBOX ? "🧪 Sandbox" : "🚀 Produção", inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Contabilidade Dellaretti" },
        }],
      }),
    });
  } catch (e) {
    logger.error(e, "Discord payment webhook error");
  }
}

async function recordPayment(body: any, status: string, pagbankId?: string, pagbankRaw?: any): Promise<PaymentRecord> {
  const rec = {
    id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    method: "checkout",
    status,
    planId: body.plan?.id || "",
    planName: body.plan?.name || "",
    planPrice: body.plan?.price || 0,
    customerName: body.name || "",
    customerEmail: body.email || "",
    customerPhone: body.phone || "",
    customerCpf: body.cpf || "",
    pagbankId: pagbankId || null,
    pagbankRaw: pagbankRaw || null,
  };
  try {
    await db.insert(paymentsTable).values(rec);
  } catch (e) {
    logger.error(e, "Failed to persist payment");
  }
  return { ...rec, createdAt: new Date() } as PaymentRecord;
}

function buildCustomer(body: any) {
  const phoneClean = (body.phone || "").replace(/\D/g, "");
  const area = phoneClean.length >= 10 ? phoneClean.slice(0, 2) : "37";
  const number = phoneClean.length >= 10 ? phoneClean.slice(2) : phoneClean;
  return {
    name: body.name,
    email: body.email,
    tax_id: (body.cpf || "").replace(/\D/g, ""),
    phone: { country: "55", area, number },
  };
}

// POST /api/pagamento/checkout — cria checkout hospedado PagBank
router.post("/checkout", async (req, res) => {
  try {
    const body = req.body;
    const { plan, name, email, cpf, phone, redirectUrl } = body;

    if (!plan || !name || !email || !cpf) {
      return res.status(400).json({ error: "Dados obrigatórios: plano, nome, email e CPF." });
    }

    const customer = buildCustomer(body);

    // Build checkout payload — supports both PIX and CREDIT_CARD on PagBank's page
    const payload: any = {
      reference_id: `dellaretti-${plan.id}-${Date.now()}`,
      customer,
      items: [{
        name: plan.name,
        quantity: 1,
        unit_amount: plan.price, // already in cents
      }],
      payment_methods: [
        { type: "CREDIT_CARD" },
        { type: "PIX" },
        { type: "BOLETO" },
      ],
      customer_modifiable: false,
      soft_descriptor: "Dellaretti",
    };

    // Add redirect URL if provided (where PagBank sends user after payment)
    if (redirectUrl) {
      payload.redirect_url = redirectUrl;
    }

    logger.info({ planId: plan.id, price: plan.price, sandbox: IS_SANDBOX }, "Creating PagBank checkout");

    const response = await fetch(`${PAGBANK_BASE}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAGBANK_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json() as any;

    if (!response.ok) {
      logger.error({ status: response.status, data }, "PagBank checkout error");
      await recordPayment(body, "ERROR", undefined, data);
      const msg = data.error_messages?.[0]?.description
        || data.message
        || "Erro ao criar checkout. Tente novamente.";
      return res.status(400).json({ error: msg, detail: data });
    }

    // Find the payment link
    const payLink = (data.links || []).find((l: any) => l.rel === "PAY");
    if (!payLink) {
      logger.error(data, "PagBank: no PAY link in response");
      return res.status(500).json({ error: "Link de pagamento não encontrado na resposta do PagBank." });
    }

    const rec = await recordPayment(body, "PENDING", data.id, data);
    await notifyDiscord(body, data);

    return res.json({
      success: true,
      checkoutId: data.id,
      recordId: rec.id,
      paymentUrl: payLink.href,
      sandbox: IS_SANDBOX,
    });
  } catch (err) {
    logger.error(err, "Pagamento error");
    return res.status(500).json({ error: "Erro interno. Tente novamente." });
  }
});

// GET /api/pagamento — lista pagamentos (admin)
router.get("/", async (req, res) => {
  const { token } = req.query;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Não autorizado." });
  }
  try {
    const rows = await db.select().from(paymentsTable).orderBy(desc(paymentsTable.createdAt));
    return res.json({
      payments: rows.map((p) => ({
        id: p.id,
        createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
        method: p.method,
        status: p.status,
        planId: p.planId,
        planName: p.planName,
        planPrice: p.planPrice,
        customerName: p.customerName,
        customerEmail: p.customerEmail,
        customerPhone: p.customerPhone,
        customerCpf: p.customerCpf,
        pagbankId: p.pagbankId,
      })),
    });
  } catch (err) {
    logger.error(err, "Pagamento GET error");
    return res.status(500).json({ error: "Erro ao listar." });
  }
});

export default router;
