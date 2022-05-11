import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

const validationMiddleware = (validations: ValidationChain[]) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
};

export default validationMiddleware;
