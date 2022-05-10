import { PrismaClientValidationError } from '@prisma/client/runtime';
import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = async (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }

  if (err instanceof PrismaClientValidationError) {
    return res.status(400).json({ message: 'Check for missing fields or incorrect type fields.' });
  }

  return res.status(500).json({ message: 'Internal server error' });
};

export default errorMiddleware;
