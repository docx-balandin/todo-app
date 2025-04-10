import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoBuilderDto } from './create-todo-builder.dto';

export class UpdateTodoBuilderDto extends PartialType(CreateTodoBuilderDto) {}
