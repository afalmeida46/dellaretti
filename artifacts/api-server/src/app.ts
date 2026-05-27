import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// --- 1. BLOCO DE SEGURANÇA MÁXIMA PARA CORS ---
const allowedOrigins = [
  "https://contabilidadedellaretti.com",
  "https://www.contabilidadedellaretti.com",
  "https://dellaretti-frontend-dqwy-6hkq.onrender.com"
];

// Middleware manual nativo (Garante que os cabeçalhos entrem em absolutamente QUALQUER resposta)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // Fallback seguro para o seu domínio principal caso a origin venha vazia
    res.setHeader("Access-Control-Allow-Origin", "https://contabilidadedellaretti.com");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Intercepta imediatamente o Preflight do navegador (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware oficial do pacote CORS (Camada dupla de proteção)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    optionsSuccessStatus: 200
  })
);

// Habilita pre-flight de CORS para todas as rotas explicitamente
app.options("*", cors());
// ------------------------------------------------

// --- 2. DEMAIS MIDDLEWARES E CONFIGURAÇÕES ---
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

// Vincula as rotas da API
app.use("/api", router);

export default app;
