import { Router } from "express";
import { db, contactsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

const WEBHOOK = process.env.DISCORD_WEBHOOK_URL || "";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dellaretti@admin2024";

async function sendDiscord(embeds: any[]) {
  if (!WEBHOOK) return;
  try {
    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "📬 Dellaretti Contato", embeds }),
    });
  } catch (e) {
    logger.error(e, "Discord webhook error");
  }
}

router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone, ramo, ramoDescricao, faturamentoAnual, regimeTributario } = req.body;
    if (!nome || !email || !telefone) return res.status(400).json({ error: "Dados inválidos." });

    const ramoFinal = ramo === "Outro" && ramoDescricao ? `Outro: ${ramoDescricao}` : ramo || null;

    await db.insert(contactsTable).values({
      nome,
      email,
      telefone,
      ramo: ramoFinal,
      ramoDescricao: ramo === "Outro" ? ramoDescricao || null : null,
      faturamentoAnual: faturamentoAnual || null,
      regimeTributario: regimeTributario || null,
    });

    await sendDiscord([
      {
        title: "📬 Novo Contato pelo Site",
        color: 0x2e6b4d,
        fields: [
          { name: "👤 Nome", value: nome, inline: true },
          { name: "📧 Email", value: email, inline: true },
          { name: "📱 Telefone", value: telefone, inline: true },
          { name: "🏢 Ramo", value: ramoFinal || "—", inline: true },
          { name: "💰 Faturamento", value: faturamentoAnual || "—", inline: true },
          { name: "📋 Regime Tributário", value: regimeTributario || "—", inline: true },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "Contabilidade Dellaretti" },
      },
    ]);

    return res.json({ success: true });
  } catch (err) {
    logger.error(err, "Contato error");
    return res.status(500).json({ error: "Erro interno." });
  }
});

router.get("/", async (req, res) => {
  try {
    const { token } = req.query;
    if (token !== ADMIN_TOKEN) return res.status(401).json({ error: "Não autorizado." });

    const contacts = await db
      .select()
      .from(contactsTable)
      .orderBy(desc(contactsTable.createdAt));

    return res.json({ contacts });
  } catch (err) {
    logger.error(err, "Contato GET error");
    return res.status(500).json({ error: "Erro interno." });
  }
});

export default router;
