import {
  NotFoundException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CommentsRepository } from 'src/comments/infrastructure/comments.repository';

export class DeleteCommentByIdCommand {
  constructor(public commentId: string, public userId: string | null) {}
}

@CommandHandler(DeleteCommentByIdCommand)
export class DeleteCommentByIdUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(command: DeleteCommentByIdCommand) {
    const comment = await this.commentsRepository.findById(
      command.commentId,
      null,
    );
    if (!comment) throw new NotFoundException();
    if (comment.commentatorInfo.userId !== command.userId) {
      throw new ForbiddenException();
    }
    await this.commentsRepository.deleteById(command.commentId);
    return HttpStatus.NO_CONTENT;
  }
}
