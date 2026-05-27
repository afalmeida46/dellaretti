import express, { type Express } from "express";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// --- CABEÇALHOS DE CORS INJETADOS MANUALMENTE ---
app.use((req, res, next) => {
  // Em vez de validar dinamicamente, vamos responder diretamente para o seu domínio
  res.setHeader("Access-Control-Allow-Origin", "https://contabilidadedellaretti.com");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With");

  // Se o navegador fizer a pergunta prévia (OPTIONS), responde com sucesso 200 na hora
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
// -------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
