import { IsNotEmpty, Length } from 'class-validator';

export class CreateThreadDto {
  @Length(3, 100)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @Length(20, 2048)
  content: string;
}
