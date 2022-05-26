import { Router } from "express";

import { authMiddleware } from "$src/middlewares";

import * as invoiceController from "./invoice.controller";

const invoiceRouter = Router();

invoiceRouter.use(authMiddleware());

invoiceRouter.post("/", invoiceController.handleCreate);
invoiceRouter.get("/", invoiceController.handleReadMany);
invoiceRouter.get("/:id", invoiceController.handleReadOne);
invoiceRouter.delete("/:id", invoiceController.handleArchive);
invoiceRouter.put("/:id", invoiceController.handleUpdate);

export default invoiceRouter;
