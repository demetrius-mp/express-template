import prisma from '$lib/prisma';
import authMiddleware from '$middlewares/auth.middleware';
import AuthService from '$services/auth.service';
import { validateSignInBody, validateSignUpBody } from '$validators/auth.validator';
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const signUp: RequestHandler = async (req, res) => {
  type ReqBody = {
    name: string;
    email: string;
    password: string;
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password }: ReqBody = req.body;

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

const signIn: RequestHandler = async (req, res) => {
  type ReqBody = {
    email: string;
    password: string;
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password }: ReqBody = req.body;

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

export const handleSignUp = [...validateSignUpBody, signUp];
export const handleSignIn = [...validateSignInBody, signIn];
export const handleMe = [authMiddleware, me];
