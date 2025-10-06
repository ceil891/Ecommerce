import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    JwtModule.register({}), // sẽ cấu hình secret khi sign
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, MailService],
  exports: [AuthService],
})
export class AuthModule {}
