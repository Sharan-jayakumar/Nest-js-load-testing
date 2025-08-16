import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskSeeder {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async seed(): Promise<void> {
    const sampleTasks = [
      {
        name: 'Complete Project Setup',
        description: 'Set up the initial project structure and dependencies',
        isCompleted: true,
      },
      {
        name: 'Database Design',
        description: 'Design and implement the database schema',
        isCompleted: true,
      },
      {
        name: 'API Development',
        description: 'Develop RESTful APIs for the application',
        isCompleted: false,
      },
      {
        name: 'Testing Implementation',
        description: 'Implement unit and integration tests',
        isCompleted: false,
      },
      {
        name: 'Documentation',
        description: 'Write comprehensive documentation for the project',
        isCompleted: false,
      },
      {
        name: 'Performance Optimization',
        description: 'Optimize application performance and database queries',
        isCompleted: false,
      },
      {
        name: 'Security Implementation',
        description: 'Implement security measures and authentication',
        isCompleted: false,
      },
      {
        name: 'Deployment Setup',
        description: 'Set up CI/CD pipeline and deployment configuration',
        isCompleted: false,
      },
      {
        name: 'Monitoring Setup',
        description: 'Implement application monitoring and logging',
        isCompleted: false,
      },
      {
        name: 'Load Testing',
        description: 'Perform load testing to ensure scalability',
        isCompleted: false,
      },
    ];

    for (const taskData of sampleTasks) {
      const existingTask = await this.taskRepository.findOne({
        where: { name: taskData.name },
      });

      if (!existingTask) {
        const task = this.taskRepository.create(taskData);
        await this.taskRepository.save(task);
        console.log(`Seeded task: ${taskData.name}`);
      } else {
        console.log(`Task already exists: ${taskData.name}`);
      }
    }

    console.log('Task seeding completed!');
  }

  async clear(): Promise<void> {
    await this.taskRepository.clear();
    console.log('All tasks cleared from database');
  }
}
