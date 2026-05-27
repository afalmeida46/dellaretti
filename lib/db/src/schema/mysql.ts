import { mysqlTable, varchar, text, int, json, timestamp } from "drizzle-orm/mysql-core";

export const leadsTable = mysqlTable("dellaretti_leads", {
  id: int("id").autoincrement().primaryKey(),
  tipo: varchar("tipo", { length: 100 }).notNull(),
  estado: varchar("estado", { length: 50 }),
  nome: varchar("nome", { length: 255 }),
  telefone: varchar("telefone", { length: 30 }),
  email: varchar("email", { length: 255 }),
  ramo: varchar("ramo", { length: 255 }),
  cpf: varchar("cpf", { length: 20 }),
  nomeEmpresa: varchar("nome_empresa", { length: 255 }),
  previsaoFaturamento: varchar("previsao_faturamento", { length: 100 }),
  funcionarios: varchar("funcionarios", { length: 50 }),
  faturamentoAnual: varchar("faturamento_anual", { length: 100 }),
  regimeTributario: varchar("regime_tributario", { length: 100 }),
  tempoEmpresa: varchar("tempo_empresa", { length: 100 }),
  raw: json("raw"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lead = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;

export const paymentsTable = mysqlTable("dellaretti_payments", {
  id: varchar("id", { length: 255 }).primaryKey(),
  method: varchar("method", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  planId: varchar("plan_id", { length: 100 }),
  planName: varchar("plan_name", { length: 255 }),
  planPrice: int("plan_price").default(0),
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerPhone: varchar("customer_phone", { length: 30 }),
  customerCpf: varchar("customer_cpf", { length: 20 }),
  pagbankId: varchar("pagbank_id", { length: 255 }),
  pagbankRaw: json("pagbank_raw"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Payment = typeof paymentsTable.$inferSelect;
export type InsertPayment = typeof paymentsTable.$inferInsert;

export const contactsTable = mysqlTable("dellaretti_contacts", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  telefone: varchar("telefone", { length: 30 }).notNull(),
  ramo: varchar("ramo", { length: 255 }),
  ramoDescricao: text("ramo_descricao"),
  faturamentoAnual: varchar("faturamento_anual", { length: 100 }),
  regimeTributario: varchar("regime_tributario", { length: 100 }),
  assunto: varchar("assunto", { length: 255 }),
  mensagem: text("mensagem"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Contact = typeof contactsTable.$inferSelect;
export type InsertContact = typeof contactsTable.$inferInsert;
