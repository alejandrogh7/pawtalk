import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get('/:id')
  getByID(@Param('id') id: string): Promise<Room | undefined> {
    return this.roomsService.getByID(id);
  }

  @Post()
  create(@Body() payload: CreateRoomInput): Promise<Room> {
    return this.roomsService.create(payload);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateRoomInput,
  ): Promise<boolean> {
    return this.roomsService.update(id, payload);
  }
}
