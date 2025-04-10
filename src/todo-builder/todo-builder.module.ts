import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoBuilder } from './entities/todo-builder.entity';
import { TodoBuilderController } from './todo-builder.controller';
import { TodoBuilderService } from './todo-builder.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoBuilder])],
  controllers: [TodoBuilderController],
  providers: [TodoBuilderService],
})
export class TodoBuilderModule {}
