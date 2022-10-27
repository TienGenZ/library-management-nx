import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { signInDto } from './dto/signIn.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/sign-in')
  signIn(@Body() dto: signInDto) {
    return this.adminService.signIn(dto);
  }

  @Get('/admin')
  findAll() {
    return this.adminService.findAll();
  }

  @Post('/admin')
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get('/admin/:id')
  findById(@Param('id') id: number) {
    return this.adminService.findById(id);
  }

  @Put('/admin/:id')
  update(@Param('id') id: number, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(id, dto);
  }

  @Delete('/admin/:id')
  delete(@Param('id') id: number) {
    return this.adminService.delete(id);
  }
}
