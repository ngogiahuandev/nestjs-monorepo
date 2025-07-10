import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenEntity {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  constructor(partial: Partial<TokenEntity>) {
    Object.assign(this, partial);
  }
}
