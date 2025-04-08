import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
// import { store } from '../store';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException('Not Found');
    }

    return todo;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new BadRequestException('Not Found');
    }

    return this.todoRepository.update(id, updateTodoDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new BadRequestException('Not Found');
    }

    return this.todoRepository.delete({ id });
  }

  // getObjectFromStore(id: number, extra?: { useIndex?: boolean }) {
  //   for (let i = 0; i < store.length; i++) {
  //     const item = store[i];
  //     if (id === item.id) {
  //       return extra?.useIndex ? i : item;
  //     }
  //   }
  //   return null;
  // }
  //
  // create(createTodoDto: CreateTodoDto) {
  //   store.push(createTodoDto);
  //   return { ok: true, id: createTodoDto.id };
  // }
  //
  // findAll() {
  //   return { data: store };
  // }
  //
  // findOne(id: number) {
  //   return { data: this.getObjectFromStore(id) };
  // }
  //
  // update(id: number, updateTodoDto: UpdateTodoDto) {
  //   const item = this.getObjectFromStore(id);
  //   if (item) {
  //     Object.assign(item, updateTodoDto);
  //     return { ok: true, id };
  //   }
  //   return { ok: false };
  // }
  //
  // remove(id: number) {
  //   const index = this.getObjectFromStore(id, { useIndex: true });
  //   if (typeof index === 'number') {
  //     store.splice(index, 1);
  //     return { ok: true, id };
  //   }
  //   return { ok: false };
  // }
}
