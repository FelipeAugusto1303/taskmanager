import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { TimeSpentModule } from './time-spent/time-spent.module';

@Module({
  imports: [TasksModule, DatabaseModule, TimeSpentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
