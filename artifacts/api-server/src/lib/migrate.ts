import { pool } from "@workspace/db";
import { logger } from "./logger";

const MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS dellaretti_leads (
  id SERIAL PRIMARY KEY,
  tipo TEXT NOT NULL,
  estado TEXT,
  nome TEXT,
  telefone TEXT,
  email TEXT,
  ramo TEXT,
  cpf TEXT,
  nome_empresa TEXT,
  previsao_faturamento TEXT,
  funcionarios TEXT,
  faturamento_anual TEXT,
  regime_tributario TEXT,
  tempo_empresa TEXT,
  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dellaretti_payments (
  id TEXT PRIMARY KEY,
  method TEXT NOT NULL,
  status TEXT NOT NULL,
  plan_id TEXT,
  plan_name TEXT,
  plan_price INTEGER DEFAULT 0,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  customer_cpf TEXT,
  pagbank_id TEXT,
  pagbank_raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dellaretti_contacts (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  ramo TEXT,
  ramo_descricao TEXT,
  faturamento_anual TEXT,
  regime_tributario TEXT,
  assunto TEXT,
  mensagem TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

export async function runMigrations() {
  try {
    await pool.query(MIGRATION_SQL);
    logger.info("Database migrations completed");
  } catch (err) {
    logger.error(err, "Database migration failed");
    throw err;
  }
}
