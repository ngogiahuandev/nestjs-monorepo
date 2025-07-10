import { ObjectType, Field } from '@nestjs/graphql';
import { TokenEntity } from './token.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@ObjectType()
export class LoginEntity {
  @Field(() => TokenEntity)
  tokens: TokenEntity;

  @Field(() => UserEntity)
  user: UserEntity;

  constructor(partial: Partial<LoginEntity>) {
    Object.assign(this, partial);
  }
}
