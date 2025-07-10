import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UpdateUserInput } from 'src/users/dto/update-user.input';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserEntity])
  async users(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Query(() => UserEntity)
  async user(@Args('id') id: string): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('id') id: string,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  async deleteUser(@Args('id') id: string): Promise<UserEntity> {
    return this.usersService.deleteUser(id);
  }
}
