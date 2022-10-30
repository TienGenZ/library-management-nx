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
import { BookTypeService } from './bookType.service';
import { CreateBookTypeDto } from './dto/createBookType.dto';
import { UpdateBookTypeDto } from './dto/updateBookType.dto';

@Controller('/book-type')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class BookTypeController {
  constructor(private readonly bookTypeService: BookTypeService) {}

  @Get()
  findAllBookType() {
    return this.bookTypeService.findAllBookType();
  }

  @Post()
  createBookType(@Body() dto: CreateBookTypeDto) {
    return this.bookTypeService.createBookType(dto);
  }

  @Get('/:id')
  findBookTypeById(@Param('id') id: number) {
    return this.bookTypeService.findBookTypeById(id);
  }

  @Put('/:id')
  updateBookType(@Param('id') id: number, @Body() dto: UpdateBookTypeDto) {
    return this.bookTypeService.updateBookType(id, dto);
  }

  @Delete('/:id')
  deleteBookType(@Param('id') id: number) {
    return this.bookTypeService.deleteBookType(id);
  }
}
