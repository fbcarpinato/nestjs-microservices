import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@nestjs-microservices/api/dto';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto) {
    this.appService.createUser(data);

    return {
      message: 'user created',
    };
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload('userId', ParseIntPipe) userId: number) {
    return this.appService.getUser(userId);
  }
}
