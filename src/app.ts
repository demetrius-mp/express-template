import cors from "cors";
import express from "express";

import { errorMiddleware } from "$src/middlewares";
import router from "$src/routers";

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
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${port}`);
    });
  }
}
