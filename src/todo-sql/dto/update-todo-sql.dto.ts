import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoSqlDto } from './create-todo-sql.dto';

export class UpdateTodoSqlDto extends PartialType(CreateTodoSqlDto) {}
