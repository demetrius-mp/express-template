import prisma from '$lib/prisma';
import authMiddleware from '$middlewares/auth.middleware';
import AuthService from '$services/auth.service';
import validationMiddleware from '$src/middlewares/validator.middleware';
import type { RequestHandlerWithBody } from '$types';
import { validateSignInBody, validateSignUpBody } from '$validators/auth.validator';
import type { RequestHandler } from 'express';

type SignUpBody = {
  name: string;
  email: string;
  password: string;
};

const signUp: RequestHandlerWithBody<SignUpBody> = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await AuthService.generatePasswordHash(password);

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return res.status(201).json(createdUser);
};

type SignInBody = {
  email: string;
  password: string;
};

const signIn: RequestHandlerWithBody<SignInBody> = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user === null) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordIsValid = await AuthService.verifyPassword(
    password,
    user.password,
  );

  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = AuthService.generateJwt({ userId: user.id });

  return res.status(200).json({ token });
};

const me: RequestHandler = async (req, res) => {
  res.status(200).json(req.user);
};

export const handleSignUp = [validationMiddleware(validateSignUpBody), signUp];
export const handleSignIn = [validationMiddleware(validateSignInBody), signIn];
export const handleMe = [authMiddleware(), me];
