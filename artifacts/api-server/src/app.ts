import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// --- 1. CONFIGURAÇÃO DE CORS NO TOPO ABSOLUTO ---
const allowedOrigins = [
  "https://contabilidadedellaretti.com",
  "https://www.contabilidadedellaretti.com",
  "https://dellaretti-frontend-dqwy-6hkq.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Se não houver origin (chamadas server-side ou ferramentas de teste), permite
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Bloqueado pelo CORS: Origem não permitida."));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
    optionsSuccessStatus: 200 // Força o status 200 para garantir que navegadores antigos aceitem o preflight
  })
);

// Trata automaticamente as requisições OPTIONS de checagem prévia antes de passar pro Logger
app.options("*", cors());
// ------------------------------------------------

// --- 2. DEMAIS MIDDLEWARES (VÊM DEPOIS DO CORS) ---
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas do sistema
app.use("/api", router);

export default app;
