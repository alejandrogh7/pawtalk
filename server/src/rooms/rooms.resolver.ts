import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room, { name: 'createRoom' })
  public create(@Args('payload') payload: CreateRoomInput): Promise<Room> {
    return this.roomsService.create(payload);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Query(() => Room, { name: 'roomByID' })
  findByID(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Room | undefined> {
    return this.roomsService.getByID(id);
  }

  @Query(() => Room, { name: 'roomByName' })
  findByName(
    @Args('name', { type: () => String }) name: string,
  ): Promise<Room | undefined> {
    return this.roomsService.getByName(name);
  }

  @Mutation(() => Boolean, { name: 'updateRoom' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('payload') payload: UpdateRoomInput,
  ): Promise<boolean> {
    return this.roomsService.update(id, payload);
  }

  // @Mutation(() => Boolean, { name: 'updateUsers' })
  // updateUsers(
  //   @Args('roomId', { type: () => String }) roomId: string,
  //   @Args('userId', { type: () => String }) userId: string,
  // ): Promise<boolean> {
  //   return this.roomsService.updateUsers(roomId, userId);
  // }

  // @Mutation(() => Boolean, { name: 'updatePosts' })
  // updatePosts(
  //   @Args('roomId', { type: () => String }) roomId: string,
  //   @Args('postId', { type: () => String }) postId: string,
  // ): Promise<boolean> {
  //   return this.roomsService.updatePosts(roomId, postId);
  // }
}
