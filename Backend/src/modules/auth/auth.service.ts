import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from '../user/dto/register.dto';
import { ForgotPasswordDto } from 'src/messages/dto/forgotpass.dto';
import { ResetPasswordDto } from 'src/messages/dto/resetpass.dto';
import { MailService } from 'src/messages/mail.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  private generateTokens(payload: { id: number; email: string; role: string }) {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.userService.validateUser(email, password);
    const tokens = this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return { message: 'Login successfully!', data: user, ...tokens };
  }

  async register(registerDto: RegisterDto) {
    await this.userService.registerUser(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );
    return await this.login(registerDto.email, registerDto.password);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new BadRequestException('Invalid email.');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await this.userService.updateResetOtp(user.email, hashedOtp, expires);
    await this.mailService.sendResetOtp(user.email, otp);

    return { message: 'OTP has been sent to your email' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new BadRequestException('Invalid email');

    if (!user.resetOtp || !user.resetOtpExpires) {
      throw new BadRequestException('No password reset request found');
    }

    if (new Date() > user.resetOtpExpires) {
      throw new BadRequestException('OTP has expired');
    }

    const isOtpValid = await bcrypt.compare(dto.otp, user.resetOtp);
    if (!isOtpValid) throw new BadRequestException('Invalid OTP');

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await user.update({ password: hashedPassword });
    await this.userService.updateResetOtp(user.email, null, null);

    return { message: 'Password reset successfully' };
  }
}