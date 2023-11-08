import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/posts/domain/entities/post.entity';
import { PostsRepository } from 'src/posts/infrastructure/posts.repository';
import { BlogsController } from './api/blogs.controller';
import { BlogsRepository } from './infrastructure/blogs.repository';
import { BlogsService } from './application/blogs.service';
import { Blog, BlogSchema } from './domain/entities/blog.entity';
import {
  LikePost,
  LikePostSchema,
} from 'src/posts/domain/entities/like-post.entity';
import { JwtService } from '@nestjs/jwt';
import { PreparationPosts } from 'src/posts/preparation.posts';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: LikePost.name, schema: LikePostSchema },
    ]),
    CqrsModule,
  ],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    { provide: 'IBlogsRepository', useClass: BlogsRepository },
    PostsRepository,
    JwtService,
    PreparationPosts,
  ],
})
export class BlogsModule {}
