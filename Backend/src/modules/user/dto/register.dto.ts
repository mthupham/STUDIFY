import { StringRequired, EmailRequired } from '@/common/decorators';
import { IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @EmailRequired('Email')
  email!: string;

  @IsString()
  @MinLength(7, { message: 'Password must be at least 7 characters long.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()_\-+=]).+$/, {
    message: 'Password must contain at least one letter, one number, and one special character.',
  })
  password!: string;

  @StringRequired('Name')
  name!: string;
}