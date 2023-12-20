import { randomUUID } from 'crypto';
import { TimeSpent } from 'src/time-spent/entities/timeSpent.entity';
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
}
