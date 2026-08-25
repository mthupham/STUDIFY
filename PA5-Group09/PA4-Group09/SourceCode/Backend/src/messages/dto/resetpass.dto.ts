import { StringRequired, EmailRequired } from '@/common/decorators';

export class ResetPasswordDto {
  @EmailRequired('Email')
  email!: string;

  @StringRequired('OTP')
  otp!: string;

  @StringRequired('New password')
  newPassword!: string;
}