import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SigninDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
