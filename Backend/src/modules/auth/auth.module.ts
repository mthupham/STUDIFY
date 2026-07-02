import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailService } from 'src/messages/mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService],
  imports: [UserModule, PassportModule],
})
export class AuthModule {}