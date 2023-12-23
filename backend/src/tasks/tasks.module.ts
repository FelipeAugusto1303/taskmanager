import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/tasks.entity';
import { TimeSpent } from 'src/time-spent/entities/timeSpent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks]),
    TypeOrmModule.forFeature([TimeSpent]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
