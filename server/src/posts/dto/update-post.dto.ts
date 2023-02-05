import { Field, InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

@InputType()
export class UpdatePostDto {
  @Field(() => String)
  text: string;
}
