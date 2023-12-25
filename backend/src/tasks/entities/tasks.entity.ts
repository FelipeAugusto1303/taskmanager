import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { TimeSpent } from '../../time-spent/entities/timeSpent.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('task')
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  dueDate: string;

  @Column({ default: false, nullable: true })
  concluded: boolean | null;

  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  concludedAt: string | null;

  @OneToMany(() => TimeSpent, (timeSpent) => timeSpent.task, { cascade: true })
  timeSpent: TimeSpent[] | [];

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }

  constructor(task?: Partial<Tasks>) {
    this.id = task?.id;
    this.title = task?.title;
    this.description = task?.description;
    this.dueDate = task?.dueDate;
    this.concluded = task?.concluded;
    this.concludedAt = task?.concludedAt;
  }
}

export class TaskLog {
  @ApiProperty()
  day: string;

  @ApiProperty()
  total_concluded: number;

  constructor(log?: Partial<TaskLog>) {
    this.day = log?.day;
    this.total_concluded = log?.total_concluded;
  }
}
