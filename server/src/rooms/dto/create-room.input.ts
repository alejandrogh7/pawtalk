import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  roomname: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  userId: string;
}
