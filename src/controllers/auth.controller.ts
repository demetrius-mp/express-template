import prisma from '$lib/prisma';
import AuthService from '$services/auth.service';
import { RequestHandler } from 'express';

export const signUp: RequestHandler = async (req, res) => {
  type ReqBody = {
    name: string;
    email: string;
    password: string;
  };

  const { name, email, password }: ReqBody = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser !== null) {
    return res.status(400).json({
      message: 'Email is already being used',
    });
  }

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

export const signIn: RequestHandler = async (req, res) => {
  type ReqBody = {
    email: string;
    password: string;
  };
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

export const me: RequestHandler = async (req, res) => {
  res.status(200).json(req.user);
};
