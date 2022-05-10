import router from '$routers/index';
import cors from 'cors';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware';

export default class App {
  private readonly app: express.Express;

  constructor() {
    this.app = express();
    this.useMiddlewares();
    this.useRouters();
    this.useErrorHandlerMiddleware();
  }

  private useMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private useRouters() {
    this.app.use(router);
  }

  private useErrorHandlerMiddleware() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(process.env.PORT || 3000, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  }
}
