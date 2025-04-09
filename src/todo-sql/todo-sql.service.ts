import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoSql } from './enitities/todo-sql.entity';
import { CreateTodoSqlDto } from './dto/create-todo-sql.dto';
import { UpdateTodoSqlDto } from './dto/update-todo-sql.dto';

@Injectable()
export class TodoSqlService {
  constructor(
    @InjectRepository(TodoSql)
    private todoSqlRepository: Repository<TodoSql>,
  ) {}

  async create(createTodoSqlDto: CreateTodoSqlDto): Promise<TodoSql> {
    const todoSql = await this.todoSqlRepository.manager.query<TodoSql[]>(
      'INSERT INTO todo_sql (title, content) VALUES ($1, $2) RETURNING *',
      [createTodoSqlDto.title, createTodoSqlDto.content],
    );
    return todoSql[0];
  }

  findAll(): Promise<TodoSql[]> {
    return this.todoSqlRepository.manager.query<TodoSql[]>(
      'SELECT * FROM todo_sql',
    );
  }

  async findOne(id: number): Promise<TodoSql> {
    const todoSql = await this.todoSqlRepository.manager.query<TodoSql[]>(
      'SELECT * FROM todo_sql WHERE id = $1',
      [id],
    );
    const item = todoSql[0];

    if (!item) {
      throw new NotFoundException('Not Found');
    }

    return item;
  }

  async update(
    id: number,
    updateTodoSqlDto: UpdateTodoSqlDto,
  ): Promise<UpdateResult> {
    const todoSql = await this.todoSqlRepository.manager.query<TodoSql[]>(
      'SELECT * FROM todo_sql WHERE id = $1',
      [id],
    );
    const item = todoSql[0];

    if (!item) {
      throw new NotFoundException('Not Found');
    }

    return this.todoSqlRepository.manager.query<UpdateResult>(
      'UPDATE todo_sql SET title = $1, content = $2 WHERE id = $3',
      [updateTodoSqlDto.title, updateTodoSqlDto.content, id],
    );
  }

  async remove(id: number): Promise<DeleteResult> {
    const todoSql = await this.todoSqlRepository.manager.query<TodoSql[]>(
      'SELECT * FROM todo_sql WHERE id = $1',
      [id],
    );
    const item = todoSql[0];

    if (!item) {
      throw new NotFoundException('Not Found');
    }

    return this.todoSqlRepository.manager.query<DeleteResult>(
      'DELETE FROM todo_sql WHERE id = $1',
      [id],
    );
  }
}
