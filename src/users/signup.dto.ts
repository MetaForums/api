import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class SignUpDto {
  @Length(3, 20)
  @IsNotEmpty()
  username: string;

  @Length(3, 20)
  @IsNotEmpty()
  displayName: string;

  @Length(8, 128)
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
