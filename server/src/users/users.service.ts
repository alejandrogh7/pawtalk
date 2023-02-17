import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public getByName(name: string): Promise<User | undefined> {
    return this.userModel.findOne({ name: name.trim() }).exec();
  }

  public getByEmail(email: string): Promise<User | undefined> {
    return this.userModel
      .findOne({ email: email.toLocaleLowerCase().trim() })
      .select('-hashedRt -__v')
      .exec();
  }

  public getByID(id: string): Promise<User | undefined> {
    if (!isValidObjectId(id)) return null;
    return this.userModel
      .findOne({ _id: id })
      .select('-password -__v')
      .populate({
        path: 'posts',
        select: '-__v -sender -createdAt -updatedAt',
        populate: {
          path: 'room',
          select:
            '-__v -description -createdAt -updatedAt -creator -posts -users',
        },
      })
      .populate(
        'rooms',
        '-__v -description -createdAt -updatedAt -creator -posts -users',
      )
      .populate(
        'createdRooms',
        '-__v -description -createdAt -updatedAt -creator -posts -users',
      )
      .exec();
  }

  public async create(payload: CreateUserDto): Promise<User> {
    const getByEmail = await this.getByEmail(payload.email);
    if (getByEmail) {
      throw new BadRequestException('EMAIL_ALREADY_EXISTS', 'Email in use');
    }

    const { password, ...userCreate } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      password: hashedPassword,
      ...userCreate,
    });
    await user.save();
    return user;
  }

  public findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .select(
        '-password -__v -rooms -posts -createdRooms -hashedRt -createdAt -updatedAt',
      )
      .exec();
  }

  public async update(id: string, payload: UpdateUserDto): Promise<boolean> {
    if (payload.email && (await this.getByEmail(payload.email))) {
      throw new BadRequestException('EMAIL_ALREADY_EXISTS', 'Email in use');
    }

    await this.userModel.findByIdAndUpdate(id, payload);
    return true;
  }

  public async updatePassword(
    id: string,
    payload: UpdateUserPasswordDto,
  ): Promise<boolean> {
    const user = await this.getByID(id);
    const { oldPassword, newPassword } = payload;
    if (!user) {
      throw new NotFoundException(
        'USER_NOT_FOUND',
        `User with ID ~ ${id} does not exists`,
      );
    }

    const match = await bcrypt.compare(newPassword, oldPassword);
    if (match !== true) {
      throw new UnauthorizedException(
        'PASSWORD_ERROR',
        'Incorrect old password',
      );
    }

    user.password = newPassword;
    await (user as UserDocument).save();
    return true;
  }

  public async removeRtToken(userId: string): Promise<boolean> {
    const user = await this.getByID(userId);
    if (!user) {
      throw new NotFoundException('WRONG_ID', 'ID is not valid');
    }
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { hashedRt: '' },
    });
    return true;
  }

  public async createPosts(userId: string, postId: string): Promise<boolean> {
    if (!isValidObjectId(userId) || !isValidObjectId(postId)) {
      throw new NotFoundException(
        'WRONG_ID_USER_AND_POST',
        'Post and User ID are not valid',
      );
    }

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { posts: postId },
    });

    return true;
  }

  public async createRooms(userId: string, roomId: string): Promise<boolean> {
    if (!isValidObjectId(userId) || !isValidObjectId(roomId)) {
      throw new NotFoundException(
        'WRONG_ID_USER_AND_ROOM',
        'Room and User ID are not valid',
      );
    }

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { rooms: roomId },
    });

    return true;
  }

  public async createCreatedRooms(
    userId: string,
    roomId: string,
  ): Promise<boolean> {
    if (!isValidObjectId(userId) || !isValidObjectId(roomId)) {
      throw new NotFoundException(
        'WRONG_ID_USER_AND_ROOM',
        'Room and User ID are not valid',
      );
    }

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { createdRooms: roomId },
    });

    return true;
  }
}
