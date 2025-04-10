import { IsString } from 'class-validator';

export class CreateTodoBuilderDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
