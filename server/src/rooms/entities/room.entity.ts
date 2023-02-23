import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongo } from 'mongoose';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Schema()
export class Room {
  @Field(() => ID)
  _id: string;

  // @Field(() => String)
  // @Prop({ required: true })
  // image: string;

  @Field(() => String)
  @Prop({ required: true })
  roomname: string;

  @Field(() => String)
  @Prop({ required: true })
  description: string;

  @Field(() => [User])
  @Prop({
    type: [{ type: SchemaMongo.Types.ObjectId, ref: 'User' }],
    required: false,
  })
  users: User[];

  @Field(() => User)
  @Prop({
    type: SchemaMongo.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  creator: User;

  @Field(() => [Post])
  @Prop({
    type: [{ type: SchemaMongo.Types.ObjectId, ref: 'Post' }],
    required: false,
  })
  posts: Post[];

  @Field(() => Date)
  @Prop({ type: Date, required: false, default: Date.now })
  createdAt: Date;

  @Field(() => Date)
  @Prop({
    type: Date,
    required: false,
    default: Date.now,
    pre: () => {
      return new Date();
    },
  })
  updatedAt: Date;
}

export type RoomDocument = Room & Document;
export const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.pre<Room>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

RoomSchema.set('timestamps', {
  createdAt: false,
  updatedAt: true,
});
