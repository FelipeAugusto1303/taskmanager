import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDateString()
  readonly dueDate: string;

  @IsBoolean()
  @IsOptional()
  readonly concluded: boolean | null;

  @IsDateString()
  @IsOptional()
  readonly concludedAt?: string | null;
}
