import type { RequestHandler } from "express";

import prisma from "$src/lib/prisma";
import { AuthService, UserService } from "$src/services";

const middleware: RequestHandler = async (req, res, next) => {
  if (
    process.env.SECURITY_UP !== undefined &&
    process.env.SECURITY_UP === "false"
  ) {
    const userService = new UserService(prisma);
    const user = await userService.findByEmail("mail@mail.com");

    if (user === null) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    return next();
  }

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const jwt = req.headers.authorization.split(" ")[1];

  const { userId } = AuthService.verifyJwt(jwt);

  const userService = new UserService(prisma);
  const user = await userService.findById(userId);

  if (user === null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  return next();
};

export default function authMiddleware(): RequestHandler {
  return middleware;
}
