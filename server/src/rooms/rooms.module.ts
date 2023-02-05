import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Room, RoomSchema } from './entities/room.entity';
import { RoomsController } from './rooms.controller';

@Module({
  exports: [RoomsService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
  ],
  providers: [RoomsResolver, RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
