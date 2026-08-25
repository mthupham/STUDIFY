import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export function StringRequired(name: string) {
  return applyDecorators(
    ApiProperty({ required: true }),
    IsString({ message: `${name} must be a string.` }),
    IsNotEmpty({ message: `${name} is required.` }),
  );
}

export function StringOptional(name: string) {
  return applyDecorators(
    ApiProperty({ required: false }),
    IsOptional(),
    IsString({ message: `${name} must be a string.` }),
  );
}

export function EmailRequired(name: string) {
  return applyDecorators(
    ApiProperty({ required: true }),
    IsEmail({}, { message: `${name} must be a valid email.` }),
    IsNotEmpty({ message: `${name} is required.` }),
  );
}

export function NumberRequired(name: string) {
  return applyDecorators(
    ApiProperty({ required: true }),
    IsNumber({}, { message: `${name} must be a number.` }),
    IsNotEmpty({ message: `${name} is required.` }),
  );
}