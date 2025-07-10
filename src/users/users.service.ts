import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from 'src/users/dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserEntity(user);
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserEntity(user);
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserInput,
        password: hashedPassword,
      },
    });
    return new UserEntity(user);
  }

  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (updateUserInput.password) {
      const hashedPassword = await bcrypt.hash(updateUserInput.password, 10);
      updateUserInput.password = hashedPassword;
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
    return new UserEntity(user);
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return new UserEntity(user);
  }
}
