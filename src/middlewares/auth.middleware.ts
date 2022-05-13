import prisma from '$src/lib/prisma';
import { AuthService } from '$src/services';
import type { RequestHandler } from 'express';

const middleware: RequestHandler = async (req, res, next) => {
  if (process.env.SECURITY_UP !== undefined && process.env.SECURITY_UP === 'false') {
    const user = await prisma.user.findUnique({
      where: {
        email: 'mail@mail.com',
      },
    });

    if (user === null) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    return next();
  }

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const jwt = req.headers.authorization.split(' ')[1];

  const payload = AuthService.verifyJwt(jwt);

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  if (user === null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user;
  return next();
};

export default function authMiddleware(): RequestHandler {
  return middleware;
}
