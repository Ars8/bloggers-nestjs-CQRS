import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './api/users.controller';
import { UsersRepository } from './infrastructure/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/entities/user.entity';
import { HashManager } from '../managers/hashManager';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, HashManager],
})
export class UsersModule {}
