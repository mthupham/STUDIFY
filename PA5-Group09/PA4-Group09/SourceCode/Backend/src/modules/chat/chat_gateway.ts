import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',  
  },
})

export class ChatGateway {
    @WebSocketServer()
    server;

    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('joinGroup')
    handleJoinGroup(
      @ConnectedSocket() client: Socket,
      @MessageBody() payload: string | { groupId?: string },
    ) {
      const groupId = typeof payload === 'string' ? payload : payload.groupId;

      if (groupId) {
        client.join(groupId);
      }

      return { joined: groupId };
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(
      @ConnectedSocket() client: Socket,
      @MessageBody()
      payload: { groupId?: string; senderId?: number; text?: string },
    ) {
      if (!payload.groupId || !payload.senderId || !payload.text) {
        return { error: 'groupId, senderId and text are required' };
      }

      const savedMessage = await this.chatService.create({
        groupId: payload.groupId,
        senderId: payload.senderId,
        text: payload.text,
      });

      this.server.to(payload.groupId).emit('newMessage', savedMessage);
      return savedMessage;
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('message', message);
    }

}

