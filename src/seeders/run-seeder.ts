import { NestFactory } from '@nestjs/core';
import { TaskSeeder } from './task.seeder';
import { SeederModule } from './seeder.module';

async function bootstrap() {
  // Create a minimal app context with only what's needed for seeding
  const app = await NestFactory.createApplicationContext(SeederModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const taskSeeder = app.get(TaskSeeder);
    await taskSeeder.seed();
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
