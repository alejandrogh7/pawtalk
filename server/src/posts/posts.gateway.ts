import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class PostsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    console.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Connected from', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Disconnected from', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    console.log(`room ${room}`);
    client.join(`room ${room}`);
  }

  @SubscribeMessage('messageRoom')
  handleMessageRoom(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    console.log(payload);
    this.wss.to(`room ${payload.room}`).emit('message', payload);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(`room ${room}`);
  }
}
