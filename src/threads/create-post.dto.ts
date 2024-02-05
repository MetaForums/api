import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class CreatePostDto {
  @Length(20, 2048)
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsNumber()
  replyId: number;
}
