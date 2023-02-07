import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsResolver } from './posts.resolver';
import { RoomsModule } from 'src/rooms/rooms.module';
import { PostsGateway } from './posts.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
    UsersModule,
    RoomsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsResolver, PostsGateway],
})
export class PostsModule {}
