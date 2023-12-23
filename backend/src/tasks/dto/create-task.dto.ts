import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { IsNotEmptyString } from 'src/common/validators/not-empty-string.validator';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'Titulo da tarefa',
  })
  @IsNotEmptyString()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Descrição da tarefa',
  })
  @IsNotEmptyString()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Data de vencimento da tarefa',
  })
  @IsDateString()
  readonly dueDate: string;

  @ApiProperty({
    description: 'Chave booleana para verificar se a tarefa está concluída',
    default: false,
  })
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  readonly concluded: boolean | null;

  @ApiProperty({
    description: 'Data da conclusão da tarefa',
    default: null,
  })
  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly concludedAt?: string | null;
}
