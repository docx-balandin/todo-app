import { IsString } from 'class-validator';

export class CreateTodoSqlDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
