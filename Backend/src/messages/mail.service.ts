
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter;
  private readonly gmailUser: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const gmailUser =
      this.configService.get<string>('GMAIL_USER');

    const gmailAppPassword =
      this.configService.get<string>(
        'GMAIL_APP_PASSWORD',
      );

  if (!gmailUser || !gmailAppPassword) {
  this.logger.warn(
    'Gmail is not configured. Forgot password email is temporarily disabled.',
  );

  this.gmailUser = '';

  this.transporter = nodemailer.createTransport({
    jsonTransport: true,
  });

  return;
}
    this.gmailUser = gmailUser;

    this.transporter =
      nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });
  }

  async sendResetOtp(
    to: string,
    otp: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: {
          name: 'Studify',
          address: this.gmailUser,
        },
        to,
        subject: 'Studify password reset code',
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Password reset</h2>

            <p>
              Use the following verification code
              to reset your password:
            </p>

            <div
              style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                margin: 24px 0;
              "
            >
              ${otp}
            </div>

            <p>This code is valid for 15 minutes.</p>

            <p>
              If you did not request a password reset,
              ignore this email.
            </p>
          </div>
        `,
      });
    } catch (error) {
      this.logger.error(
        'Unable to send reset OTP email.',
        error instanceof Error
          ? error.stack
          : undefined,
      );

      throw new InternalServerErrorException(
        'Unable to send reset email.',
      );
    }
  }
}