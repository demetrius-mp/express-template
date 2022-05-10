import prisma from '$lib/prisma';
import AuthService from '$services/auth.service';
import { RequestHandler } from 'express';

const authMiddleware: RequestHandler = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const jwt = req.headers.authorization.split(' ')[1];

  const payload = AuthService.verifyJwt(jwt);

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
    select: {
      email: true,
      name: true,
    },
  });

  if (user === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user;
  return next();
};

export default authMiddleware;
