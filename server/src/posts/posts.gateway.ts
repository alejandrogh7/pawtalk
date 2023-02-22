import { Logger, NotFoundException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RoomsService } from 'src/rooms/rooms.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class PostsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly roomsService: RoomsService,
    private readonly postsService: PostsService,
  ) {}

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

  @SubscribeMessage('messageRoom')
  async handleMessageRoom(client: Socket, payload: CreatePostDto) {
    const room = await this.roomsService.getByID(payload.room);

    if (!room) {
      throw new NotFoundException(
        'ROOM_NOT_FOUND',
        `Room with ID~${payload.room} not found`,
      );
    }

    const createdPost = await this.postsService.create(payload);
    const getCreatedPost = await this.postsService.getByID(createdPost._id);

    console.log(`Send room: ${room.roomname}`);

    client.emit('message', getCreatedPost);
    // this.wss.to(`room ${room.roomname}`).emit('message', getCreatedPost);
    client.broadcast.emit('message', getCreatedPost);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, roomID: string) {
    const room = await this.roomsService.getByID(roomID);

    if (!room) {
      throw new NotFoundException(
        'ROOM_NOT_FOUND',
        `Room with ID~${roomID} not found`,
      );
    }
    console.log(`Joining ${room.roomname}`);
    client.join(`Joining ${room.roomname}`);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket, roomID: string) {
    const room = await this.roomsService.getByID(roomID);

    if (!room) {
      throw new NotFoundException(
        'ROOM_NOT_FOUND',
        `Room with ID~${roomID} not found`,
      );
    }
    console.log(`Leaving ${room.roomname}`);
    client.leave(`Leaving ${room.roomname}`);
  }
}
