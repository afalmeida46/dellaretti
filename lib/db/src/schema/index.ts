import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  tipo: text("tipo").notNull(),
  estado: text("estado"),
  nome: text("nome"),
  telefone: text("telefone"),
  email: text("email"),
  ramo: text("ramo"),
  cpf: text("cpf"),
  nomeEmpresa: text("nome_empresa"),
  previsaoFaturamento: text("previsao_faturamento"),
  funcionarios: text("funcionarios"),
  faturamentoAnual: text("faturamento_anual"),
  regimeTributario: text("regime_tributario"),
  tempoEmpresa: text("tempo_empresa"),
  raw: jsonb("raw"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Lead = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;

export const paymentsTable = pgTable("payments", {
  id: text("id").primaryKey(),
  method: text("method").notNull(),
  status: text("status").notNull(),
  planId: text("plan_id"),
  planName: text("plan_name"),
  planPrice: integer("plan_price").default(0),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  customerCpf: text("customer_cpf"),
  pagbankId: text("pagbank_id"),
  pagbankRaw: jsonb("pagbank_raw"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Payment = typeof paymentsTable.$inferSelect;
export type InsertPayment = typeof paymentsTable.$inferInsert;

export const contactsTable = pgTable("contacts", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone").notNull(),
  ramo: text("ramo"),
  ramoDescricao: text("ramo_descricao"),
  faturamentoAnual: text("faturamento_anual"),
  regimeTributario: text("regime_tributario"),
  assunto: text("assunto"),
  mensagem: text("mensagem"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Contact = typeof contactsTable.$inferSelect;
export type InsertContact = typeof contactsTable.$inferInsert;
