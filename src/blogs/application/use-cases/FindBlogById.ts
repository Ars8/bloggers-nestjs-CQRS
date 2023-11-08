import { NotFoundException } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { BlogsRepository } from 'src/blogs/infrastructure/blogs.repository';

export class FindBlogByIdQuery {
  constructor(public blogId: string) {}
}

@QueryHandler(FindBlogByIdQuery)
export class FindBlogByIdUseCase {
  constructor(private blogRepository: BlogsRepository) {}

  async execute(query: FindBlogByIdQuery) {
    const blog = await this.blogRepository.findOne(query.blogId);
    if (!blog) throw new NotFoundException();
    return blog;
  }
}
