import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post, { name: 'createPost' })
  public create(@Args('payload') payload: CreatePostDto): Promise<Post> {
    return this.postsService.create(payload);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findByID(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Post | undefined> {
    return this.postsService.getByID(id);
  }

  @Mutation(() => Boolean)
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('payload') payload: UpdatePostDto,
  ): Promise<boolean> {
    return this.postsService.update(id, payload);
  }
}
