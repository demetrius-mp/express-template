import type { TypedRequestHandler } from '$src/global';
import prisma from '$src/lib/prisma';
import { authMiddleware, validationMiddleware } from '$src/middlewares';
import { AuthService } from '$src/services';
import { validateNewTokenBody, validateSignInBody, validateSignUpBody } from '$src/validators/auth.validator';
import type { RequestHandler } from 'express';

type SignUpBody = {
  name: string;
  email: string;
  password: string;
};

const signUp: TypedRequestHandler<SignUpBody, {t: number}> = async (req, res) => {
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

const signIn: TypedRequestHandler<SignInBody> = async (req, res) => {
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

type NewTokenBody = {
  token: string;
}

const newToken: TypedRequestHandler<NewTokenBody> = async (req, res) => {
  const { token } = req.body;

  const { userId } = AuthService.verifyJwt(token, {
    ignoreExpiration: true,
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user === null) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const freshToken = AuthService.generateJwt({ userId: user.id });

  return res.status(200).json({ token: freshToken });
};

const me: RequestHandler = async (req, res) => {
  res.status(200).json(req.user);
};

export const handleSignUp = [
  validationMiddleware(validateSignUpBody),
  signUp,
] as RequestHandler[];

export const handleSignIn = [
  validationMiddleware(validateSignInBody),
  signIn,
] as RequestHandler[];

export const handleMe = [
  authMiddleware(),
  me,
] as RequestHandler[];

export const handleNewToken = [
  validationMiddleware(validateNewTokenBody),
  newToken,
] as RequestHandler[];
