import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat_gateway';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Message, User])],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
