import { NotFoundException } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { PostsRepository } from 'src/posts/posts.repository';

export class FindPostByIdQuery {
  constructor(
    public postId: string,
    public user: { userId: string; userName: string } | null,
  ) {}
}

@QueryHandler(FindPostByIdQuery)
export class FindPostByIdUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(query: FindPostByIdQuery) {
    const post = await this.postsRepository.findOne(query.postId, query.user);
    if (!post) throw new NotFoundException();
    return post;
  }
}
