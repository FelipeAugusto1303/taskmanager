import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeSpentDTO } from './create-time-spent.dto';

export class UpdateTimeSpentDTO extends PartialType(CreateTimeSpentDTO) {}
