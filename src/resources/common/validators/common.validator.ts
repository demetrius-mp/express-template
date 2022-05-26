import { param, query } from "express-validator";

export const validatePageInQuery = [
  query("page")
    .optional()
    .isInt({
      gt: 0,
    })
    .withMessage("Page must be a number greater than 0.")
    .toInt(10),
];

export const validateIdInParams = [
  param("id").isString().withMessage("Id must be a string."),
];
