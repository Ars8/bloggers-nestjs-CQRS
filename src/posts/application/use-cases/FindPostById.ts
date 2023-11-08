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
    return this.postsRepository.findOne(query.postId, query.user);
  }
}
