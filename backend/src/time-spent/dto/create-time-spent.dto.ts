import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { IsNotEmptyString } from '../../common/validators/not-empty-string.validator';
import { Tasks } from '../../tasks/entities/tasks.entity';

export class CreateTimeSpentDTO {
  @ApiProperty({
    description: 'Data do registro ',
  })
  @IsDateString()
  readonly spentAt: string;

  @ApiProperty({
    description: 'Tempo gasto em horas na tarefa',
  })
  @IsNumber()
  readonly timeSpent: number;

  @ApiProperty({
    description: 'Um breve comentário sobre a atividade',
  })
  @IsNotEmptyString()
  @IsString()
  readonly comment: string;

  @ApiProperty({
    description: 'Id da tarefa',
  })
  @IsString()
  readonly task: Tasks;
}
