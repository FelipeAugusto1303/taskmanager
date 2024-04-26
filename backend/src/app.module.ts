import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { TimeSpentModule } from './time-spent/time-spent.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TasksModule, DatabaseModule, TimeSpentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
