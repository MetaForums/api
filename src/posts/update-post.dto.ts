import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @Length(20, 2048)
  content: string;
}
