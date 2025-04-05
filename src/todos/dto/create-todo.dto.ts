import { IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
