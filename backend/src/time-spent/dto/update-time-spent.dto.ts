import { PartialType } from '@nestjs/swagger';
import { CreateTimeSpentDTO } from './create-time-spent.dto';

export class UpdateTimeSpentDTO extends PartialType(CreateTimeSpentDTO) {}
