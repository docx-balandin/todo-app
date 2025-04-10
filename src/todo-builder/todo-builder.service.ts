import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { TodoBuilder } from './entities/todo-builder.entity';
import { CreateTodoBuilderDto } from './dto/create-todo-builder.dto';
import { UpdateTodoBuilderDto } from './dto/update-todo-builder.dto';

@Injectable()
export class TodoBuilderService {
  constructor(
    @Inject(DataSource)
    private dataSource: DataSource,
  ) {}

  async create(
    createTodoBuilderDto: CreateTodoBuilderDto,
  ): Promise<TodoBuilder> {
    const createTodo = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(TodoBuilder)
      .values([
        {
          title: createTodoBuilderDto.title,
          content: createTodoBuilderDto.content,
        },
      ])
      .returning('*')
      .execute();
    return createTodo.generatedMaps[0] as TodoBuilder;
  }

  findAll(): Promise<TodoBuilder[]> {
    return this.dataSource
      .getRepository(TodoBuilder)
      .createQueryBuilder()
      .addSelect('*')
      .getMany();
  }

  async findOne(id: number): Promise<TodoBuilder> {
    const item = await this.dataSource
      .getRepository(TodoBuilder)
      .createQueryBuilder()
      .where('id = :id', { id: id })
      .getOne();

    if (!item) {
      throw new NotFoundException('Not found');
    }

    return item;
  }

  async update(
    id: number,
    updateBuilderTodoDto: UpdateTodoBuilderDto,
  ): Promise<UpdateResult> {
    const item = await this.dataSource
      .getRepository(TodoBuilder)
      .createQueryBuilder()
      .where('id = :id', { id: id })
      .getOne();

    if (!item) {
      throw new BadRequestException('Not found');
    }

    return this.dataSource
      .createQueryBuilder()
      .update(TodoBuilder)
      .set({
        title: updateBuilderTodoDto.title,
        content: updateBuilderTodoDto.content,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async remove(id: number): Promise<DeleteResult> {
    const item = await this.dataSource
      .getRepository(TodoBuilder)
      .createQueryBuilder()
      .where('id = :id', { id: id })
      .getOne();

    if (!item) {
      throw new BadRequestException('Not found');
    }

    return this.dataSource
      .createQueryBuilder()
      .delete()
      .from(TodoBuilder)
      .where('id = :id', { id: id })
      .execute();
  }
}
