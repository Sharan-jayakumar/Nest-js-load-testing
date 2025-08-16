import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const task = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(task);
    } catch {
      throw new BadRequestException('Failed to create task');
    }
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    try {
      Object.assign(task, updateTaskDto);
      return await this.taskRepository.save(task);
    } catch {
      throw new BadRequestException('Failed to update task');
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    try {
      await this.taskRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Failed to delete task');
    }
  }

  async findCompleted(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { isCompleted: true, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async findPending(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { isCompleted: false, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async toggleComplete(id: number): Promise<Task> {
    const task = await this.findOne(id);
    task.isCompleted = !task.isCompleted;
    return await this.taskRepository.save(task);
  }
}
