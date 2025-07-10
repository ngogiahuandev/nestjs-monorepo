import { ObjectType } from '@nestjs/graphql';
import { LoginEntity } from 'src/auth/entities/login.entity';

@ObjectType()
export class RegisterEntity extends LoginEntity {}
