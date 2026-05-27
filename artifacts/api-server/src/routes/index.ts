import { Router, type IRouter } from "express";
import healthRouter from "./health";
import pagamentoRouter from "./pagamento";
import contatoRouter from "./contato";
import leadsRouter from "./leads";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/pagamento", pagamentoRouter);
router.use("/contato", contatoRouter);
router.use("/leads", leadsRouter);

export default router;
