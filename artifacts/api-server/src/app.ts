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

// --- MIDDLEWARE DE CORS MANUAL (FORÇA BRUTA) ---
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://contabilidadedellaretti.com",
    "https://www.contabilidadedellaretti.com",
    "https://dellaretti-frontend-dqwy-6hkq.onrender.com"
  ];

  // Se a origem da requisição estiver na lista, nós permitimos ela explicitamente
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // Caso a requisição venha sem origem (servidor para servidor / Postman)
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  
  // Cabeçalhos essenciais para o funcionamento do painel admin
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With");

  // Se o navegador enviar um OPTIONS (Preflight), responde com 200 OK imediatamente sem barrar
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
// ------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
