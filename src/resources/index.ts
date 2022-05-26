import { Router } from "express";

import { authMiddleware } from "$src/middlewares";

import authRouter from "./auth/auth.router";
import invoiceRouter from "./invoices/invoice.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/invoices", authMiddleware(), invoiceRouter);

export default router;
