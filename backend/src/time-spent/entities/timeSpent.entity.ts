import { randomUUID } from 'crypto';
import { Tasks } from 'src/tasks/entities/tasks.entity';
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
}
