import prisma from '$lib/prisma';
import { body } from 'express-validator';

export const validateSignUpBody = [
  body('name').isString().isLength({ min: 3 }),
  body('email').isEmail().normalizeEmail().custom(async (value) => {
    const user = await prisma.user.findUnique({
      where: {
        email: value,
      },
    });

    if (user) {
      return Promise.reject(Error('Email already in use.'));
    }

    return Promise.resolve();
  }),
  body('password').isLength({ min: 8 }),
];

export const validateSignInBody = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
];
