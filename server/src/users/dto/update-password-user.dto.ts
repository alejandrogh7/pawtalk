import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordDto {
  @Field(() => String)
  oldPassword: string;

  @Field(() => String)
  newPassword: string;
}
