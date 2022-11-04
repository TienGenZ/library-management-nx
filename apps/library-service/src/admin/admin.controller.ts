import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';

@Controller('/admin')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('')
  findAll() {
    return this.adminService.findAll();
  }

  @Post('')
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.adminService.findById(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.adminService.delete(id);
  }
}
