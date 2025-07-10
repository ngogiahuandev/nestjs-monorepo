import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { RedisService } from 'src/redis/redis.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}
}
