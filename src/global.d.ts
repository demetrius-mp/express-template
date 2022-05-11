/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { User } from '@prisma/client';
import { RequestHandler } from 'express';
import { Algorithm } from 'jsonwebtoken';

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: number;
      JWT_SECRET_KEY: string;
      JWT_EXPIRES_IN?: string;
      JWT_ALGORITHM?: Algorithm;
    }
  }
}

interface CustomRequest extends Express.Request {
  user: User;
}

declare module 'express-serve-static-core' {
  export interface Request extends CustomRequest {}
}

export interface RequestHandlerWithParams<T> extends RequestHandler<T> {}

export interface RequestHandlerWithBody<T> extends RequestHandler<{}, {}, T> {}

export interface RequestHandlerWithParamsAndBody<Params, Body>
  extends RequestHandler<Params, {}, Body> {}
