import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { store } from '../store';

@Injectable()
export class TodosService {
  getObjectFromStore(id: number, extra?: { useIndex?: boolean }) {
    for (let i = 0; i < store.length; i++) {
      const item = store[i];
      if (id === item.id) {
        return extra?.useIndex ? i : item;
      }
    }
    return null;
  }

  create(createTodoDto: CreateTodoDto) {
    store.push(createTodoDto);
    return { ok: true, id: createTodoDto.id };
  }

  findAll() {
    return { data: store };
  }

  findOne(id: number) {
    return { data: this.getObjectFromStore(id) };
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const item = this.getObjectFromStore(id);
    if (item) {
      Object.assign(item, updateTodoDto);
      return { ok: true, id };
    }
    return { ok: false };
  }

  remove(id: number) {
    const index = this.getObjectFromStore(id, { useIndex: true });
    if (typeof index === 'number') {
      store.splice(index, 1);
      return { ok: true, id };
    }
    return { ok: false };
  }
}
