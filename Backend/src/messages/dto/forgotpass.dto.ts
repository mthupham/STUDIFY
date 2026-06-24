import { EmailRequired } from '@/common/decorators';

export class ForgotPasswordDto {
  @EmailRequired('Email')
  email!: string;
}