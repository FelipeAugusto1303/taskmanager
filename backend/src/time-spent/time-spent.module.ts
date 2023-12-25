import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSpent } from './entities/timeSpent.entity';
import { TimeSpentService } from './time-spent.service';
import { TimeSpentController } from './time-spent.controller';
import { Tasks } from 'src/tasks/entities/tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeSpent]),
    TypeOrmModule.forFeature([Tasks]),
  ],
  providers: [TimeSpentService],
  controllers: [TimeSpentController],
})
export class TimeSpentModule {}
