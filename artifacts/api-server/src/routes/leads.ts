import { Router } from "express";
import { desc } from "drizzle-orm";
import { db, leadsTable, type InsertLead } from "@workspace/db";
import { logger } from "../lib/logger";

const router = Router();

const WEBHOOK = process.env.DISCORD_WEBHOOK_URL || "";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dellaretti@admin2024";

async function sendDiscord(lead: any) {
  if (!WEBHOOK) return;
  try {
    const isAbrir = lead.tipo === "Abrir Empresa";
    const fields = isAbrir
      ? [
          { name: "📋 Tipo", value: lead.tipo, inline: true },
          { name: "🗺️ Estado", value: lead.estado === "mg" ? "Minas Gerais" : "Outros Estados", inline: true },
          { name: "👤 Nome", value: lead.nome || "—", inline: true },
          { name: "🏷️ Nome da Empresa", value: lead.nomeEmpresa || "—", inline: true },
          { name: "📱 Telefone", value: lead.telefone || "—", inline: true },
          { name: "📧 Email", value: lead.email || "—", inline: true },
          { name: "🪪 CPF", value: lead.cpf || "—", inline: true },
          { name: "🏢 Ramo", value: lead.ramo || "—", inline: true },
          { name: "💰 Faturamento Previsto", value: lead.previsaoFaturamento || "—", inline: true },
          { name: "📎 Docs a enviar", value: "IPTU da sede · RG/CPF/CNH do sócio · Nome da empresa\nWhatsApp: (37) 3222-8889\nEmail: contato@contabilidadedellaretti.com.br", inline: false },
        ]
      : [
          { name: "📋 Tipo", value: lead.tipo, inline: true },
          { name: "🗺️ Estado", value: lead.estado === "mg" ? "Minas Gerais" : "Outros Estados", inline: true },
          { name: "👤 Nome", value: lead.nome || "—", inline: true },
          { name: "📱 Telefone", value: lead.telefone || "—", inline: true },
          { name: "📧 Email", value: lead.email || "—", inline: true },
          { name: "🏢 Ramo", value: lead.ramo || "—", inline: true },
          { name: "👥 Funcionários", value: lead.funcionarios || "—", inline: true },
          { name: "💰 Faturamento Anual", value: lead.faturamentoAnual || "—", inline: true },
          { name: "📊 Regime Tributário", value: lead.regimeTributario || "—", inline: true },
          { name: "⏳ Tempo de Empresa", value: lead.tempoEmpresa || "—", inline: true },
        ];

    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "🎯 Dellaretti Leads",
        embeds: [
          {
            title: `🎯 Novo Lead — ${lead.tipo}`,
            color: 0x2e6b4d,
            fields,
            timestamp: new Date().toISOString(),
            footer: { text: "Contabilidade Dellaretti" },
          },
        ],
      }),
    });
  } catch (e) {
    logger.error(e, "Discord leads webhook error");
  }
}

router.post("/", async (req, res) => {
  try {
    const b = req.body || {};
    const insert: InsertLead = {
      tipo: b.tipo || "—",
      estado: b.estado || null,
      nome: b.nome || null,
      telefone: b.telefone || null,
      email: b.email || null,
      ramo: b.ramo || null,
      cpf: b.cpf || null,
      nomeEmpresa: b.nomeEmpresa || null,
      previsaoFaturamento: b.previsaoFaturamento || null,
      funcionarios: b.funcionarios || null,
      faturamentoAnual: b.faturamentoAnual || null,
      regimeTributario: b.regimeTributario || null,
      tempoEmpresa: b.tempoEmpresa || null,
      raw: b,
    };
    await db.insert(leadsTable).values(insert);
    await sendDiscord({ ...b, ...insert });
    return res.json({ success: true });
  } catch (err) {
    logger.error(err, "Leads POST error");
    return res.status(500).json({ error: "Erro interno." });
  }
});

router.get("/", async (req, res) => {
  const { token } = req.query;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Não autorizado." });
  }
  try {
    const rows = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
    return res.json({
      leads: rows.map((r) => ({
        ...r,
        createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
      })),
    });
  } catch (err) {
    logger.error(err, "Leads GET error");
    return res.status(500).json({ error: "Erro ao listar." });
  }
});

export default router;
