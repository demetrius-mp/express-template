import prisma from '$lib/prisma';
import { body } from 'express-validator';

async function isUniqueEmail(value: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: value,
    },
  });

  if (user) {
    return Promise.reject(Error('Email already in use.'));
  }

  return Promise.resolve();
}

export const validateSignUpBody = [
  body('name')
    .isString()
    .withMessage('Name must be a string.')
    .isLength({ min: 3 })
    .withMessage('Name must have at least 3 characters.'),

  body('email')
    .isEmail()
    .withMessage('Invalid email.')
    .normalizeEmail()
    .custom(isUniqueEmail)
    .withMessage('Email already in use.'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters.'),
];

export const validateSignInBody = [
  body('email')
    .isEmail()
    .withMessage('Invalid email.')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters.'),
];
