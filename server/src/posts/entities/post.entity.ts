import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongo } from 'mongoose';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Schema()
export class Post {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  text: string;

  @Field(() => User)
  @Prop({
    type: SchemaMongo.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  sender: User;

  @Field(() => Room)
  @Prop({
    type: SchemaMongo.Types.ObjectId,
    ref: 'Room',
    required: true,
  })
  room: Room;

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

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre<Post>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

PostSchema.set('timestamps', {
  createdAt: false,
  updatedAt: true,
});
