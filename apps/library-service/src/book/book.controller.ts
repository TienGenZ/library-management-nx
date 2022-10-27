import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import {
  CreateBookDto,
  CreateBookTypeDto,
  CreatePublisherDto,
} from './dto/createBook.dto';
import {
  UpdateBookDto,
  UpdateBookTypeDto,
  UpdatePublisherDto,
} from './dto/updateBook.dto';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/book')
  findAll() {
    return this.bookService.findAll();
  }

  @Post('/book')
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get('/book/:id')
  findById(@Param('id') id: number) {
    return this.bookService.findById(id);
  }

  @Put('/book/:id')
  update(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @Delete('/book/:id')
  delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }

  @Get('/book/book-type')
  findAllBookType() {
    return this.bookService.findAllBookType();
  }

  @Post('/book/book-type')
  createBookType(@Body() dto: CreateBookTypeDto) {
    return this.bookService.createBookType(dto);
  }

  @Get('/book/book-type/:id')
  findBookTypeById(@Param('id') id: number) {
    return this.bookService.findBookTypeById(id);
  }

  @Put('/book/book-type/:id')
  updateBookType(@Param('id') id: number, @Body() dto: UpdateBookTypeDto) {
    return this.bookService.updateBookType(id, dto);
  }

  @Delete('/book/book-type/:id')
  deleteBookType(@Param('id') id: number) {
    return this.bookService.deleteBookType(id);
  }

  @Get('/book/publisher')
  findAllPublisher() {
    return this.bookService.findAllPublisher();
  }

  @Post('/book/publisher')
  createPublisher(@Body() dto: CreatePublisherDto) {
    return this.bookService.createPublisher(dto);
  }

  @Get('/book/publisher/:id')
  findPublisherById(@Param('id') id: number) {
    return this.bookService.findPublisherById(id);
  }

  @Put('/book/publisher/:id')
  updatePublisher(@Param('id') id: number, @Body() dto: UpdatePublisherDto) {
    return this.bookService.updatePublisher(id, dto);
  }

  @Delete('/book/publisher/:id')
  deletePublisher(@Param('id') id: number) {
    return this.bookService.deletePublisher(id);
  }
}
