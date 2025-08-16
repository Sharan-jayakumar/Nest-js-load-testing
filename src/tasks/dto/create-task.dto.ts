import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(1, { message: 'Task name must not be empty' })
  @MaxLength(255, { message: 'Task name must not exceed 255 characters' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
