import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { IgnoreExpirationStrategy } from './strategies/ignore-expiration.strategy';
import { env } from 'src/lib/env';

@Module({
  imports: [
    UsersModule,
    NestJwtModule.registerAsync({
      useFactory: () => ({
        secret: env.ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: env.ACCESS_TOKEN_EXPIRE_IN,
        },
      }),
    }),
  ],
  providers: [JwtService, JwtStrategy, IgnoreExpirationStrategy],
  exports: [JwtService, JwtStrategy, IgnoreExpirationStrategy],
})
export class JwtModule {}
