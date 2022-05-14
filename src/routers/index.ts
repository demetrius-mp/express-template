import authRouter from "$src/routers/auth.router";
import invoiceRouter from "$src/routers/invoice.router";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/invoice", invoiceRouter);

export default router;
