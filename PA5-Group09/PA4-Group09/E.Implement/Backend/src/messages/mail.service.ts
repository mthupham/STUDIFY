import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_APP_PASSWORD'),
      },
    });
  }

  async sendResetOtp(to: string, otp: string) {
    await this.transporter.sendMail({
      from: this.configService.get<string>('GMAIL_USER'),
      to,
      subject: 'Reset Password - Studify',
      html: `<p>Your OTP is: <b>${otp}</b></p><p>The OTP is valid for 15 minutes.</p>`,
    });
  }
}