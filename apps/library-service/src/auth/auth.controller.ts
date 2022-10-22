import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/auth')
  getData() {
    return this.authService.getUser('admin');
  }

  @Post('/sign-in')
  createUser() {
    return this.authService.createUser();
  }
}
