import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { runMigrations } from "../lib/migrate";

const router: IRouter = Router();

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dellaretti@admin2024";

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.post("/migrate", async (req, res) => {
  const { token } = req.query;
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: "Não autorizado." });
  try {
    await runMigrations();
    return res.json({ success: true, message: "Migração concluída." });
  } catch (err: any) {
    return res.status(500).json({ error: "Falha na migração.", detail: err?.message });
  }
});

export default router;
