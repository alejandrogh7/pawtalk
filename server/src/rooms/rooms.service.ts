import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Room, RoomDocument } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    private readonly usersService: UsersService,
  ) {}

  public async getByName(roomname: string): Promise<Room | undefined> {
    return this.roomModel.findOne({ roomname: roomname.trim() }).exec();
  }

  public async getByID(id: string): Promise<Room | undefined> {
    if (!isValidObjectId(id)) return null;
    return this.roomModel
      .findOne({ _id: id })
      .select('-__v')
      .populate({
        path: 'posts',
        select: '-__v -room',
        populate: {
          path: 'sender',
          select:
            '-__v -posts -password -email -rooms -hashedRt -createdAt -updatedAt -createdRooms',
        },
      })
      .populate(
        'users',
        '-__v -posts -password -email -rooms -createdAt -updatedAt -hashedRt -createdRooms',
      )
      .populate(
        'creator',
        '-__v -posts -password -email -rooms -createdAt -updatedAt -hashedRt -createdRooms',
      )
      .exec();
  }

  public async create(payload: CreateRoomInput): Promise<Room> {
    const getByName = await this.getByName(payload.roomname);
    if (getByName) {
      throw new BadRequestException('ROOM_ALREADY_EXISTS', 'Roomname in use');
    }

    const getUserByID = await this.usersService.getByID(payload.userId);
    if (!getUserByID) {
      throw new NotFoundException('USER_NOT_FOUND', 'User ID does not exists');
    }

    const { userId, ...result } = payload;

    const room = new this.roomModel({ ...result, creator: userId });
    await room.save();
    await room.updateOne({
      $push: { users: userId },
    });
    const [updatedUser, updatedCreator] = await Promise.all([
      this.usersService.createRooms(userId, room.id),
      this.usersService.createCreatedRooms(userId, room.id),
    ]);
    if (updatedUser && updatedCreator) {
      return room;
    }
  }

  public findAll(): Promise<Room[]> {
    return this.roomModel
      .find()
      .select('-__v -posts -users -createdAt -updatedAt')
      .populate(
        'creator',
        '-__v -posts -password -email -rooms -createdAt -updatedAt -hashedRt -createdRooms',
      )
      .exec();
  }

  public async update(id: string, payload: UpdateRoomInput): Promise<boolean> {
    const getByID = await this.getByID(id);
    if (!getByID) {
      throw new NotFoundException(
        'ROOM_DOES_NOT_EXISTS',
        'Room does not exists',
      );
    }
    await this.roomModel.findByIdAndUpdate(id, payload);
    return true;
  }

  public async updateUsers(roomId: string, userId: string): Promise<boolean> {
    if (!isValidObjectId(userId) && !isValidObjectId(roomId)) {
      throw new NotFoundException(
        'WRONG_ID_USER_AND_ROOM',
        'ROOM and User ID are not valid',
      );
    }

    await this.roomModel.findByIdAndUpdate(roomId, {
      $push: { users: userId },
    });
    return true;
  }

  public async updatePosts(roomId: string, postId: string): Promise<boolean> {
    if (!isValidObjectId(roomId) && !isValidObjectId(postId)) {
      throw new NotFoundException(
        'WRONG_ID_ROOM_AND_POST',
        'Post and Room ID are not valid',
      );
    }

    await this.roomModel.findByIdAndUpdate(roomId, {
      $push: { posts: postId },
    });
    return true;
  }
}
