import { CreateUserDto } from '@nestjs-microservices/api/dto';
import { User } from '@nestjs-microservices/api/entities';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class AppService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(data: CreateUserDto): void {
    this.usersRepository.save(data);
  }

  getUser(id: number): User {
    return this.usersRepository.findOne(id);
  }
}
