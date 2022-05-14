import type { RequestHandler } from "express";
import { ValidationChain, validationResult } from "express-validator";

export default function validationMiddleware(validations: ValidationChain[]) {
  const middleware: RequestHandler = async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return next();
  };

  return middleware;
}
