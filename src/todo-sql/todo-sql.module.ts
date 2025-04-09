import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoSql } from './enitities/todo-sql.entity';
import { TodoSqlService } from './todo-sql.service';
import { TodoSqlController } from './todo-sql.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoSql])],
  controllers: [TodoSqlController],
  providers: [TodoSqlService],
})
export class TodoSqlModule {}
