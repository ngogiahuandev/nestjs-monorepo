import { UserEntity } from 'src/users/entities/user.entity';

export interface GqlContext {
  req: {
    user: UserEntity;
  };
}
