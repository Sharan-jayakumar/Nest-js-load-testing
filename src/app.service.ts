import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; status: string } {
    return {
      message: 'Hello World!',
      status: 'success',
    };
  }

  calculateAge(date: string): {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
  } {
    try {
      // Parse the input date (DD-MM-YYYY format)
      const [day, month, year] = date.split('-');
      const inputDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      );
      const currentDate = new Date();

      // Validate the date
      if (isNaN(inputDate.getTime())) {
        throw new BadRequestException(
          'Invalid date format. Please use DD-MM-YYYY format',
        );
      }

      // Calculate the difference in milliseconds
      const timeDifference = currentDate.getTime() - inputDate.getTime();

      // Convert to different time units
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Calculate years, months, and remaining days
      let years = currentDate.getFullYear() - inputDate.getFullYear();
      let months = currentDate.getMonth() - inputDate.getMonth();
      let remainingDays = currentDate.getDate() - inputDate.getDate();

      // Adjust for negative months or days
      if (remainingDays < 0) {
        months--;
        // Get the last day of the previous month
        const lastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0,
        );
        remainingDays += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // Calculate remaining hours and minutes
      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;

      return {
        years,
        months,
        days: remainingDays,
        hours: remainingHours,
        minutes: remainingMinutes,
        totalDays: days,
        totalHours: hours,
        totalMinutes: minutes,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Error calculating date difference: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
