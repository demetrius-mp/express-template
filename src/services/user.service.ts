import { excludePrismaFields } from "$src/lib/prisma";
import type { PrismaClient, User } from "@prisma/client";
import AuthService from "./auth.service";

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export default class UserService {
  authService = AuthService;

  constructor(private prisma: PrismaClient) {}

  findByEmail<B extends boolean>(
    email: string,
    includePassword?: B
  ): Promise<B extends true ? User : Omit<User, "password">>;

  async findByEmail(email: string, includePassword: boolean = false) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select:
        includePassword === true
          ? undefined
          : excludePrismaFields("user", ["password"]),
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: excludePrismaFields("user", ["password"]),
    });
  }

  async create({ email, name, password }: CreateUser) {
    const hashedPassword = await this.authService.generatePasswordHash(
      password
    );

    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: excludePrismaFields("user", ["password"]),
    });
  }
}
