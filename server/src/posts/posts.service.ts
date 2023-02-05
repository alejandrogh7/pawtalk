import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly usersServices: UsersService,
    private readonly roomsServices: RoomsService,
  ) {}

  public async create(payload: CreatePostDto): Promise<Post> {
    const getUserByID = await this.usersServices.getByID(payload.sender);
    if (!getUserByID) {
      throw new BadRequestException(
        'ID_DOES_NOT_EXISTS_USER',
        `ID ~ ${payload.sender} does not exists`,
      );
    }

    const getRoomByID = await this.roomsServices.getByID(payload.room);
    if (!getRoomByID) {
      throw new BadRequestException(
        'ID_DOES_NOT_EXISTS_ROOM',
        `ID ~ ${payload.room} does not exists`,
      );
    }

    const post = new this.postModel(payload);
    await post.save();
    const userUpdated = await this.usersServices.createPosts(
      payload.sender,
      post.id,
    );
    const roomUpdated = await this.roomsServices.updatePosts(
      payload.room,
      post.id,
    );

    if (userUpdated && roomUpdated) {
      return post;
    }
  }

  public findAll(): Promise<Post[]> {
    return this.postModel
      .find()
      .select('-__v')
      .populate(
        'sender',
        '-__v -posts -password -email -rooms -hashedRt -createdAt -updatedAt -createdRooms',
      )
      .populate(
        'room',
        '-__v -posts -users -description -createdAt -updatedAt -creator',
      )
      .exec();
  }

  public getByID(id: string): Promise<Post | undefined> {
    if (!isValidObjectId(id)) return null;
    return this.postModel.findOne({ _id: id }).exec();
  }

  public async update(id: string, payload: UpdatePostDto): Promise<boolean> {
    await this.postModel.findByIdAndUpdate(id, payload);
    return true;
  }
}
