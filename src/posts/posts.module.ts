import { Module } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { Blog, BlogSchema } from '../blogs/entities/blog.entity';
import {
  Comment,
  CommentSchema,
} from 'src/comments/domain/entities/comment.entity';
import { PostsController } from './api/posts.controller';
import { PostsService } from './application/posts.service';
import { CommentsRepository } from 'src/comments/infrastructure/comments.repository';
import { LikePost, LikePostSchema } from './entities/like-post.entity';
import {
  LikeComment,
  LikeCommentSchema,
} from 'src/comments/domain/entities/like-comment.entity';
import { JwtService } from '@nestjs/jwt';
import { PreparationPosts } from './preparation.posts';
import { PreparationComments } from 'src/comments/preparation.comments';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: LikePost.name, schema: LikePostSchema },
      { name: LikeComment.name, schema: LikeCommentSchema },
    ]),
    CqrsModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    CommentsRepository,
    JwtService,
    PreparationPosts,
    PreparationComments,
  ],
})
export class PostsModule {}
