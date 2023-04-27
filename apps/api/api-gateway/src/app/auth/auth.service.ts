import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@nestjs-microservices/api/dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const response = await lastValueFrom(
      this.authClient.send('create_user', JSON.stringify(createUserDto))
    );

    return response;
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('create_user');
  }
}
