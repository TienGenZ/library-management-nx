import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/user')
  getAllUser() {
    return this.usersService.getUser('admin');
  }

  @Post('/user')
  createUser() {
    return this.usersService.createUser();
  }

  @Put('/user/:id')
  updateUser(@Param('id') id: number) {
    return this.usersService.checkExistUser(id);
  }
}
