import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginEntity } from 'src/auth/entities/login.entity';
import { LoginInput } from 'src/auth/dto/login.dto';
import { RegisterInput } from 'src/auth/dto/register.dto';
import { RegisterEntity } from 'src/auth/entities/register.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenEntity } from 'src/auth/entities/token.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthIgnoreExpGuard } from 'src/auth/guards/gql-auth-ignore-exp.guard';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginEntity)
  login(@Args('loginInput') loginInput: LoginInput): Promise<LoginEntity> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => RegisterEntity)
  register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<RegisterEntity> {
    return this.authService.register(registerInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  logout(@CurrentUser() user: UserEntity): Promise<string> {
    return this.authService.logout(user.id);
  }

  @UseGuards(GqlAuthIgnoreExpGuard)
  @Mutation(() => TokenEntity)
  refreshToken(
    @Args('refreshToken') refreshToken: string,
    @CurrentUser() user: UserEntity,
  ): Promise<TokenEntity> {
    return this.authService.refreshTokens(refreshToken, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  getMe(@CurrentUser() user: UserEntity): UserEntity {
    console.log(user);
    return user;
  }
}
