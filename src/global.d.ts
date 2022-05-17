/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { User } from "@prisma/client";
import { RequestHandler } from "express";
import type {
  ParamsDictionary,
  Query as QueryType,
} from "express-serve-static-core";
import { Algorithm } from "jsonwebtoken";

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: number;
      JWT_SECRET_KEY: string;
      JWT_EXPIRES_IN?: string;
      JWT_ALGORITHM?: Algorithm;
      SECURITY_UP?: "true" | "false";
    }
  }

  interface TypedRequestHandler<
    Body = {},
    Params = ParamsDictionary,
    Query = QueryType
  > extends RequestHandler<Params, {}, Body, Query> {}
}

interface CustomRequest extends Express.Request {
  user: Omit<User, "password">;
}

declare module "express-serve-static-core" {
  export interface Request extends CustomRequest {}
}
