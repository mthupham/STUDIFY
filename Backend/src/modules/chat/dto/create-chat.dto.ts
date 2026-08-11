import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  declare groupId: string;

  @IsNumber()
  declare senderId: number;

  @IsString()
  @IsNotEmpty()
  declare  text: string;
}