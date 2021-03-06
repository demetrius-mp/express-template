import { body } from "express-validator";

import prisma from "$src/lib/prisma";
import { UserService } from "$src/services";

async function isUniqueEmail(value: string) {
  const userService = new UserService(prisma);
  const user = await userService.findByEmail(value);

  if (user) {
    return Promise.reject(Error("Email already in use."));
  }

  return Promise.resolve();
}

export const validateSignUpBody = [
  body("name")
    .isString()
    .withMessage("Name must be a string.")
    .isLength({ min: 3 })
    .withMessage("Name must have at least 3 characters."),

  body("email")
    .isEmail()
    .withMessage("Invalid email.")
    .normalizeEmail()
    .custom(isUniqueEmail)
    .withMessage("Email already in use."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters."),
];

export const validateSignInBody = [
  body("email").isEmail().withMessage("Invalid email.").normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters."),
];

export const validateNewTokenBody = [
  body("token").isString().withMessage("Token must be a string."),
];
