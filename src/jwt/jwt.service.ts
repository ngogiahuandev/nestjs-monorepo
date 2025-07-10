import { Injectable } from '@nestjs/common';
import {
  JwtService as NestJwtService,
  JwtSignOptions,
  JsonWebTokenError,
} from '@nestjs/jwt';
import { env } from 'src/lib/env';

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  signAccessToken(payload: JwtPayload, options?: JwtSignOptions): string {
    return this.jwt.sign(payload, {
      expiresIn: env.ACCESS_TOKEN_EXPIRE_IN,
      secret: env.ACCESS_TOKEN_SECRET,
      ...options,
    });
  }

  signRefreshToken(payload: JwtPayload, options?: JwtSignOptions): string {
    return this.jwt.sign(payload, {
      expiresIn: env.REFRESH_TOKEN_EXPIRE_IN,
      secret: env.REFRESH_TOKEN_SECRET,
      ...options,
    });
  }

  generateTokens(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.signAccessToken(payload);
    const refreshToken = this.signRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  verifyToken(
    token: string,
    type: TokenType,
    isIgnoreExpiration = false,
  ): boolean {
    try {
      switch (type) {
        case TokenType.ACCESS:
          this.jwt.verify(token, {
            secret: env.ACCESS_TOKEN_SECRET,
            ...(isIgnoreExpiration && { ignoreExpiration: false }),
          });
          return true;
        case TokenType.REFRESH:
          this.jwt.verify(token, {
            secret: env.REFRESH_TOKEN_SECRET,
            ...(isIgnoreExpiration && { ignoreExpiration: false }),
          });
          return true;
        default:
          return false;
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        console.log(error.message);
      }
      return false;
    }
  }
}
