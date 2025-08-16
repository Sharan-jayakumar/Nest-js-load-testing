import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';
import { Task } from '../entities/task.entity';
import { TaskSeeder } from './task.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [TaskSeeder],
  exports: [TaskSeeder],
})
export class SeederModule {}
