import express, { type Express } from "express";
import cors from "cors";
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

// --- CONFIGURAÇÃO INDUSTRIAL DE CORS ---
const allowedOrigins = [
  "https://contabilidadedellaretti.com",
  "https://www.contabilidadedellaretti.com",
  "https://dellaretti-frontend-dqwy-6hkq.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Se não houver origin (ex: chamadas internas do servidor ou Postman), permite
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Bloqueado pelo CORS: Origem não permitida."));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
    optionsSuccessStatus: 204 // Código padrão ideal para respostas OPTIONS (No Content)
  })
);

// Habilita o pre-flight para todas as rotas automaticamente
app.options("*", cors());
// ----------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
