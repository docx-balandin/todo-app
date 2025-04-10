import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoBuilderService } from './todo-builder.service';
import { CreateTodoBuilderDto } from './dto/create-todo-builder.dto';
import { TodoBuilder } from './entities/todo-builder.entity';
import { UpdateTodoBuilderDto } from './dto/update-todo-builder.dto';

@Controller('todo_builder')
export class TodoBuilderController {
  constructor(private readonly todoBuilderService: TodoBuilderService) {}

  @Post()
  async create(
    @Body() createTodoBuilderDto: CreateTodoBuilderDto,
  ): Promise<{ data: TodoBuilder }> {
    const data = await this.todoBuilderService.create(createTodoBuilderDto);
    return { data };
  }

  @Get()
  async findAll(): Promise<{ data: TodoBuilder[] }> {
    const data = await this.todoBuilderService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.todoBuilderService.findOne(+id);
    return { data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoBuilderDto: UpdateTodoBuilderDto,
  ) {
    const data = await this.todoBuilderService.update(
      +id,
      updateTodoBuilderDto,
    );
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.todoBuilderService.remove(+id);
    return { data };
  }
}
