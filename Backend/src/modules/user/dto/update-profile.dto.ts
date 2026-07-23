import { StringOptional } from '@/common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @StringOptional('Name')
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email.' })
  email?: string;

  @StringOptional('Avatar')
  avatar?: string;

  @StringOptional('Phone')
  phone?: string;
}