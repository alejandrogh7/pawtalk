import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
