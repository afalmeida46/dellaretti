// =============================================
// Contabilidade Dellaretti — API Server
// Deploy: Render.com + MySQL externo
// =============================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const ALLOWED_ORIGINS = [
  "https://contabilidadedellaretti.com.br",
  "https://www.contabilidadedellaretti.com.br",
  /\.onrender\.com$/,
  /\.replit\.dev$/,
  /\.replit\.app$/,
];

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = ALLOWED_ORIGINS.some((o) =>
        typeof o === "string" ? o === origin : o.test(origin)
      );
      callback(null, allowed ? origin : false);
    },
    credentials: true,
  })
);

// -----------------------------------------------
// CONFIGURAÇÕES — altere conforme seu cPanel
// -----------------------------------------------
const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "contabilidade",
  password: process.env.DB_PASS || "SUA_SENHA_AQUI",
  database: process.env.DB_NAME || "contabil_wp520",
  waitForConnections: true,
  connectionLimit: 10,
};

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dellaretti@admin2024";
const PAGBANK_TOKEN = process.env.PAGBANK_TOKEN || "";
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL || "";
const PORT = process.env.PORT || 3000;

const IS_SANDBOX = !PAGBANK_TOKEN;
const PAGBANK_BASE = IS_SANDBOX
  ? "https://sandbox.api.pagseguro.com"
  : "https://api.pagseguro.com";

// -----------------------------------------------
// Conexão com MySQL
// -----------------------------------------------
let pool;
async function getPool() {
  if (!pool) pool = mysql.createPool(DB_CONFIG);
  return pool;
}

// -----------------------------------------------
// Health check
// -----------------------------------------------
app.get("/api/healthz", (req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

// -----------------------------------------------
// LEADS
// -----------------------------------------------
app.post("/api/leads", async (req, res) => {
  try {
    const b = req.body || {};
    const db = await getPool();
    await db.execute(
      `INSERT INTO dellaretti_leads
        (tipo, estado, nome, telefone, email, ramo, cpf,
         nome_empresa, previsao_faturamento, funcionarios,
         faturamento_anual, regime_tributario, tempo_empresa, raw)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        b.tipo || "—",
        b.estado || null,
        b.nome || null,
        b.telefone || null,
        b.email || null,
        b.ramo || null,
        b.cpf || null,
        b.nomeEmpresa || null,
        b.previsaoFaturamento || null,
        b.funcionarios || null,
        b.faturamentoAnual || null,
        b.regimeTributario || null,
        b.tempoEmpresa || null,
        JSON.stringify(b),
      ]
    );
    await sendDiscordLead(b);
    return res.json({ success: true });
  } catch (err) {
    console.error("Leads POST error:", err);
    return res.status(500).json({ error: "Erro interno." });
  }
});

app.get("/api/leads", async (req, res) => {
  if (req.query.token !== ADMIN_TOKEN)
    return res.status(401).json({ error: "Não autorizado." });
  try {
    const db = await getPool();
    const [rows] = await db.execute(
      "SELECT * FROM dellaretti_leads ORDER BY created_at DESC"
    );
    return res.json({ leads: rows });
  } catch (err) {
    console.error("Leads GET error:", err);
    return res.status(500).json({ error: "Erro ao listar." });
  }
});

// -----------------------------------------------
// CONTATO
// -----------------------------------------------
app.post("/api/contato", async (req, res) => {
  try {
    const { nome, email, telefone, ramo, ramoDescricao, faturamentoAnual, regimeTributario } = req.body;
    if (!nome || !email || !telefone)
      return res.status(400).json({ error: "Dados inválidos." });
    const ramoFinal = ramo === "Outro" && ramoDescricao ? `Outro: ${ramoDescricao}` : ramo || null;
    const db = await getPool();
    await db.execute(
      `INSERT INTO dellaretti_contacts
        (nome, email, telefone, ramo, ramo_descricao, faturamento_anual, regime_tributario)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, telefone, ramoFinal, ramoDescricao || null, faturamentoAnual || null, regimeTributario || null]
    );
    await sendDiscordContato({ nome, email, telefone, ramo: ramoFinal, faturamentoAnual, regimeTributario });
    return res.json({ success: true });
  } catch (err) {
    console.error("Contato POST error:", err);
    return res.status(500).json({ error: "Erro interno." });
  }
});

app.get("/api/contato", async (req, res) => {
  if (req.query.token !== ADMIN_TOKEN)
    return res.status(401).json({ error: "Não autorizado." });
  try {
    const db = await getPool();
    const [rows] = await db.execute(
      "SELECT * FROM dellaretti_contacts ORDER BY created_at DESC"
    );
    return res.json({ contacts: rows });
  } catch (err) {
    console.error("Contato GET error:", err);
    return res.status(500).json({ error: "Erro ao listar." });
  }
});

// -----------------------------------------------
// PAGAMENTO (PagBank)
// -----------------------------------------------
app.post("/api/pagamento/checkout", async (req, res) => {
  try {
    const body = req.body;
    const phone = (body.phone || "").replace(/\D/g, "");
    const customer = {
      name: body.name,
      email: body.email,
      tax_id: (body.cpf || "").replace(/\D/g, ""),
      phone: {
        country: "55",
        area: phone.length >= 10 ? phone.slice(0, 2) : "37",
        number: phone.length >= 10 ? phone.slice(2) : phone,
      },
    };

    const plan = body.plan || {};
    const amount = { value: plan.price || 0, currency: "BRL" };
    const ref = `del_${Date.now()}`;

    let pagbankResult = null;
    let pagbankId = null;
    let status = "pending";

    try {
      const pbRes = await fetch(`${PAGBANK_BASE}/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PAGBANK_TOKEN}`,
        },
        body: JSON.stringify({
          reference_id: ref,
          customer,
          items: [{ name: plan.name || "Plano Dellaretti", quantity: 1, unit_amount: amount.value }],
          payment_methods: [{ type: "CREDIT_CARD" }, { type: "PIX" }],
          redirect_url: body.redirectUrl || `https://contabilidadedellaretti.com.br/novaversao/01/pagamento?pagamento=sucesso`,
        }),
      });
      pagbankResult = await pbRes.json();
      pagbankId = pagbankResult?.id;
      if (pbRes.ok) status = "created";
    } catch (pbErr) {
      console.error("PagBank error:", pbErr);
    }

    const payId = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const db = await getPool();
    await db.execute(
      `INSERT INTO dellaretti_payments
        (id, method, status, plan_id, plan_name, plan_price,
         customer_name, customer_email, customer_phone, customer_cpf,
         pagbank_id, pagbank_raw)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payId, "checkout", status,
        plan.id || "", plan.name || "", plan.price || 0,
        body.name || "", body.email || "", body.phone || "", body.cpf || "",
        pagbankId || null, JSON.stringify(pagbankResult),
      ]
    );

    return res.json({ success: true, checkout: pagbankResult, paymentId: payId });
  } catch (err) {
    console.error("Pagamento error:", err);
    return res.status(500).json({ error: "Erro no pagamento." });
  }
});

app.get("/api/pagamento", async (req, res) => {
  if (req.query.token !== ADMIN_TOKEN)
    return res.status(401).json({ error: "Não autorizado." });
  try {
    const db = await getPool();
    const [rows] = await db.execute(
      "SELECT * FROM dellaretti_payments ORDER BY created_at DESC"
    );
    return res.json({ payments: rows });
  } catch (err) {
    console.error("Pagamento GET error:", err);
    return res.status(500).json({ error: "Erro ao listar." });
  }
});

// -----------------------------------------------
// Discord Webhooks (opcional)
// -----------------------------------------------
async function sendDiscordLead(lead) {
  if (!DISCORD_WEBHOOK) return;
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "🎯 Dellaretti Leads",
        embeds: [{
          title: `🎯 Novo Lead — ${lead.tipo || "—"}`,
          color: 0x2e6b4d,
          fields: [
            { name: "👤 Nome", value: lead.nome || "—", inline: true },
            { name: "📱 Telefone", value: lead.telefone || "—", inline: true },
            { name: "📧 Email", value: lead.email || "—", inline: true },
            { name: "🏢 Ramo", value: lead.ramo || "—", inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Contabilidade Dellaretti" },
        }],
      }),
    });
  } catch (e) { console.error("Discord lead error:", e); }
}

async function sendDiscordContato(data) {
  if (!DISCORD_WEBHOOK) return;
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "📬 Dellaretti Contato",
        embeds: [{
          title: "📬 Novo Contato pelo Site",
          color: 0x2e6b4d,
          fields: [
            { name: "👤 Nome", value: data.nome || "—", inline: true },
            { name: "📧 Email", value: data.email || "—", inline: true },
            { name: "📱 Telefone", value: data.telefone || "—", inline: true },
            { name: "🏢 Ramo", value: data.ramo || "—", inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Contabilidade Dellaretti" },
        }],
      }),
    });
  } catch (e) { console.error("Discord contato error:", e); }
}

// -----------------------------------------------
// Iniciar servidor
// -----------------------------------------------
app.listen(PORT, () => {
  console.log(`✅ API Dellaretti rodando na porta ${PORT}`);
});
