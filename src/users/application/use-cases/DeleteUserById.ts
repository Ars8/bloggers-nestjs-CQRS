import { HttpStatus, NotFoundException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/infrastructure/users.repository';

export class DeleteUserByIdCommand {
  constructor(public userId: string) {}
}

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(command: DeleteUserByIdCommand) {
    const deletedUser = await this.userRepository.remove(command.userId);
    if (!deletedUser) throw new NotFoundException();
    return HttpStatus.NO_CONTENT;
  }
}
