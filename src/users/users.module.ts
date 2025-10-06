import { Module } from '@nestjs/common';
import { UsersController } from './presentation/users.controller';
import { UsersService } from './domain/users.service';

@Module({ controllers: [UsersController], providers: [UsersService] })
export class UsersModule {}
