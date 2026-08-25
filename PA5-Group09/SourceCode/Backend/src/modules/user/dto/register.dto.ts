import { StringRequired, EmailRequired } from '@/common/decorators';

export class RegisterDto {
  @EmailRequired('Email')
  email!: string;

  @StringRequired('Password')
  password!: string;

  @StringRequired('Name')
  name!: string;
}