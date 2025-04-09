import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoSqlService } from './todo-sql.service';
import { CreateTodoSqlDto } from './dto/create-todo-sql.dto';
import { TodoSql } from './enitities/todo-sql.entity';
import { UpdateTodoSqlDto } from './dto/update-todo-sql.dto';

@Controller('todo-sql')
export class TodoSqlController {
  constructor(private readonly todoSqlService: TodoSqlService) {}

  @Post()
  async create(
    @Body() createTodoSqlDto: CreateTodoSqlDto,
  ): Promise<{ data: TodoSql }> {
    const data = await this.todoSqlService.create(createTodoSqlDto);
    return { data };
  }

  @Get()
  async findAll(): Promise<{ data: TodoSql[] }> {
    const data = await this.todoSqlService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.todoSqlService.findOne(+id);
    return { data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoSqlDto: UpdateTodoSqlDto,
  ) {
    const data = await this.todoSqlService.update(+id, updateTodoSqlDto);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.todoSqlService.remove(+id);
    return { data };
  }
}
