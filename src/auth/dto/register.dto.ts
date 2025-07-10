import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { IsEmail } from 'class-validator';
import { IsStrongPassword } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsStrongPassword()
  @ValidateIf(
    (object: RegisterInput, value: string) => value === object.password,
  )
  confirmPassword: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;
}
