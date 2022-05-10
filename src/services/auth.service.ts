import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export type JwtPayloadType = {
  userId: User['id'];
}

export default class AuthService {
  static HASH_ROUNDS = 10;

  public static async generatePasswordHash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, AuthService.HASH_ROUNDS);

    return hashedPassword;
  }

  public static async verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
    const isCorrect = await bcrypt.compare(plainPassword, hash);

    return isCorrect;
  }

  public static generateJwt(payload: object): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });

    return token;
  }

  public static verifyJwt(token: string): JwtPayloadType {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayloadType;

    return payload;
  }
}
