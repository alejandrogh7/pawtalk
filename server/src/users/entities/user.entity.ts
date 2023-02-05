import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongo } from 'mongoose';
import { Post } from 'src/posts/entities/post.entity';
import { Room } from 'src/rooms/entities/room.entity';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ lowercase: true, required: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field(() => [Post])
  @Prop({ type: [{ type: SchemaMongo.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Field(() => [Room])
  @Prop({ type: [{ type: SchemaMongo.Types.ObjectId, ref: 'Room' }] })
  rooms: Room[];

  @Field(() => [Room])
  @Prop({ type: [{ type: SchemaMongo.Types.ObjectId, ref: 'Room' }] })
  createdRooms: Room[];

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

  @Field()
  @Prop({ required: false })
  hashedRt: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

UserSchema.set('timestamps', {
  createdAt: false,
  updatedAt: true,
});
