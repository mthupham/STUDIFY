import { StringRequired, EmailRequired } from '@/common/decorators';

export class LoginDto {
  @EmailRequired('Email')
  email!: string;

  @StringRequired('Password')
  password!: string;
}