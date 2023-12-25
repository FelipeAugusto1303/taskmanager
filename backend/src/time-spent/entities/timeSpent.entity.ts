import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Tasks } from '../../tasks/entities/tasks.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('timeSpent')
export class TimeSpent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @Column()
  timeSpent: number;

  @Column({ type: 'date' })
  spentAt: string;

  @ManyToOne(() => Tasks, (task) => task.timeSpent)
  task: Tasks;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }

  constructor(timeSpent?: Partial<TimeSpent>) {
    this.id = timeSpent?.id;
    this.comment = timeSpent?.comment;
    this.timeSpent = timeSpent?.timeSpent;
    this.spentAt = timeSpent?.spentAt;
  }
}

export class TaskHour {
  @ApiProperty()
  spentAt: string;

  @ApiProperty()
  hours: number;

  constructor(taskHour?: Partial<TaskHour>) {
    this.spentAt = taskHour?.spentAt;
    this.hours = taskHour?.hours;
  }
}
