import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSpent } from './entities/timeSpent.entity';
import { TimeSpentService } from './time-spent.service';
import { TimeSpentController } from './time-spent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSpent])],
  providers: [TimeSpentService],
  controllers: [TimeSpentController],
})
export class TimeSpentModule {}
