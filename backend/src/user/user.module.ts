import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'jwtSuperSecret',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
