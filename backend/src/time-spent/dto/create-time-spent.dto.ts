import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Tasks } from 'src/tasks/entities/tasks.entity';

export class CreateTimeSpentDTO {
  @IsDateString()
  readonly spentAt: string;

  @IsNumber()
  readonly timeSpent: number;

  @IsString()
  readonly comment: string;

  @IsString()
  readonly task: Tasks;
}
