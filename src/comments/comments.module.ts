import { Module, Post } from '@nestjs/common';
import { CommentsService } from './application/comments.service';
import { CommentsController } from './api/comments.controller';
import { CommentsRepository } from './infrastructure/comments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './domain/entities/comment.entity';
import {
  LikeComment,
  LikeCommentSchema,
} from './domain/entities/like-comment.entity';
import { PreparationComments } from './preparation.comments';
import { JwtService } from '@nestjs/jwt';
import { PostSchema } from 'src/posts/domain/entities/post.entity';
import { Blog, BlogSchema } from 'src/blogs/domain/entities/blog.entity';
import { LikePost, LikePostSchema } from 'src/posts/domain/entities/like-post.entity';
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
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsRepository,
    PreparationComments,
    JwtService,
  ],
})
export class CommentsModule {}
