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
import { BookService } from './book.service';
import {
  CreateBookDto,
} from './dto/createBook.dto';
import {
  UpdateBookDto,
} from './dto/updateBook.dto';

@Controller('/book')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.bookService.findById(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.bookService.softDelete(id);
  }

  @Get('/search/:query')
  findByQuery(@Param('query') query: string) {
    return this.bookService.findByQuery(query);
  }
}
