import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): { message: string; status: string } {
    return this.appService.getHello();
  }

  @Get('/api/calculate-date')
  calculateAge(@Query('date') date: string): {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
  } {
    return this.appService.calculateAge(date);
  }
}
