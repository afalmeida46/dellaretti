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

// --- CONFIGURAÇÃO DO CORS ATUALIZADA ---
const allowedOrigins = [
  "https://dellaretti-frontend-dqwy-6hkq.onrender.com",
  "https://contabilidadedellaretti.com",
  "https://www.contabilidadedellaretti.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requisições sem origem (como Postman ou chamadas server-side)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Bloqueado pelo CORS: Esta origem não é permitida."));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// ---------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
