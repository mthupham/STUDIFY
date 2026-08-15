import {
  OnGatewayInit,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Namespace, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',  
  },
})

export class ChatGateway implements OnGatewayInit {
    @WebSocketServer()
    server;

    constructor(
      private readonly chatService: ChatService,
      private readonly jwtService: JwtService,
    ) {}

    afterInit(server: Namespace) {
      server.use(async (client, next) => {
        const handshakeToken = client.handshake.auth?.token;
        const authorization = client.handshake.headers.authorization;
        const bearerToken = authorization?.startsWith('Bearer ')
          ? authorization.slice(7)
          : undefined;
        const token = handshakeToken || bearerToken;

        if (!token || typeof token !== 'string') {
          next(new Error('Unauthorized'));
          return;
        }

        try {
          client.data.user = await this.jwtService.verifyAsync(token);
          next();
        } catch {
          next(new Error('Unauthorized'));
        }
      });
    }

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

