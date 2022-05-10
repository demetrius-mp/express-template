/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { User } from '@prisma/client';
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

declare module 'express-serve-static-core' {
  export interface Request extends Express.Request {
    user: Omit<User, 'id'|'password'>;
  }
}
