import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { VerifyOptions } from 'jsonwebtoken';

export type JwtPayloadType = {
  userId: User['id'];
}

export default class AuthService {
  static HASH_ROUNDS = 10;

  static SECRET_KEY = process.env.JWT_SECRET_KEY;

  static EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

  static ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';

  public static async generatePasswordHash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.HASH_ROUNDS);

    return hashedPassword;
  }

  public static async verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
    const isCorrect = await bcrypt.compare(plainPassword, hash);

    return isCorrect;
  }

  public static generateJwt(payload: object): string {
    const token = jwt.sign(payload, this.SECRET_KEY, {
      algorithm: this.ALGORITHM,
      expiresIn: this.EXPIRES_IN,
    });

    return token;
  }

  public static verifyJwt(token: string, options?: VerifyOptions): JwtPayloadType {
    const payload = jwt.verify(token, this.SECRET_KEY, options) as JwtPayloadType;

    return payload;
  }
}
