import { randomUUID } from 'crypto';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  generateId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.fullname = user?.fullname;
    this.email = user?.email;
    this.password = user?.password;
  }
}
