import { invoiceController } from '$src/controllers';
import { authMiddleware } from '$src/middlewares';
import { Router } from 'express';

const invoiceRouter = Router();

invoiceRouter.use(authMiddleware());

invoiceRouter.post('/', invoiceController.handleCreate);
invoiceRouter.get('/', invoiceController.handleReadMany);

export default invoiceRouter;
