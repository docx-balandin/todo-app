import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoSqlModule } from './todo-sql/todo-sql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: +(configService.get<string>('POSTGRES_PORT') || 5432),
          username: configService.get<string>('POSTGRES_USERNAME'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_NAME'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    TodosModule,
    TodoSqlModule,
  ],
})
export class AppModule {}
