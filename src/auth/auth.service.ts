import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from 'src/auth/dto/login.dto';
import { RegisterInput } from 'src/auth/dto/register.dto';
import { LoginEntity } from 'src/auth/entities/login.entity';
import { RegisterEntity } from 'src/auth/entities/register.entity';
import { TokenEntity } from 'src/auth/entities/token.entity';
import { JwtService, TokenType } from 'src/jwt/jwt.service';
import { RedisService } from 'src/redis/redis.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async login(loginInput: LoginInput): Promise<LoginEntity> {
    const user = await this.userService.validateUser(
      loginInput.email,
      loginInput.password,
    );

    const tokens = this.jwtService.generateTokens({
      sub: user.id,
      email: user.email,
    });

    await this.redisService.set(user.id, tokens.refreshToken, 7 * 24 * 60 * 60);

    return new LoginEntity({
      tokens,
      user,
    });
  }

  async register(registerInput: RegisterInput): Promise<RegisterEntity> {
    const { email, password, name } = registerInput;
    await this.userService.createUser({
      email,
      password,
      name,
    });
    return this.login({ email, password });
  }

  async refreshTokens(
    refreshToken: string,
    user: UserEntity,
  ): Promise<TokenEntity> {
    const isTokenValid = this.jwtService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
      true,
    );

    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const decoded = this.jwtService.decodeToken(refreshToken) as {
      exp?: number;
    } | null;
    const oldExp =
      decoded && typeof decoded.exp === 'number' ? decoded.exp : undefined;
    if (!oldExp) {
      throw new UnauthorizedException('Invalid refresh token (no exp)');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.signAccessToken(payload);
    const newRefreshToken = this.jwtService.signRefreshTokenWithExp(
      payload,
      oldExp,
    );

    await this.redisService.set(
      user.id,
      newRefreshToken,
      oldExp - Math.floor(Date.now() / 1000),
    );

    return new TokenEntity({
      accessToken,
      refreshToken: newRefreshToken,
    });
  }

  async logout(userId: string): Promise<string> {
    await this.redisService.del(userId);
    return 'Logged out successfully';
  }
}
