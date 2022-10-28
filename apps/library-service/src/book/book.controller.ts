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
  CreateBookTypeDto,
  CreatePublisherDto,
} from './dto/createBook.dto';
import {
  UpdateBookDto,
  UpdateBookTypeDto,
  UpdatePublisherDto,
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
    return this.bookService.delete(id);
  }

  @Get('/book-type')
  findAllBookType() {
    return this.bookService.findAllBookType();
  }

  @Post('/book-type')
  createBookType(@Body() dto: CreateBookTypeDto) {
    return this.bookService.createBookType(dto);
  }

  @Get('/book-type/:id')
  findBookTypeById(@Param('id') id: number) {
    return this.bookService.findBookTypeById(id);
  }

  @Put('/book-type/:id')
  updateBookType(@Param('id') id: number, @Body() dto: UpdateBookTypeDto) {
    return this.bookService.updateBookType(id, dto);
  }

  @Delete('/book-type/:id')
  deleteBookType(@Param('id') id: number) {
    return this.bookService.deleteBookType(id);
  }

  @Get('/publisher')
  findAllPublisher() {
    return this.bookService.findAllPublisher();
  }

  @Post('/publisher')
  createPublisher(@Body() dto: CreatePublisherDto) {
    return this.bookService.createPublisher(dto);
  }

  @Get('/publisher/:id')
  findPublisherById(@Param('id') id: number) {
    return this.bookService.findPublisherById(id);
  }

  @Put('/publisher/:id')
  updatePublisher(@Param('id') id: number, @Body() dto: UpdatePublisherDto) {
    return this.bookService.updatePublisher(id, dto);
  }

  @Delete('/publisher/:id')
  deletePublisher(@Param('id') id: number) {
    return this.bookService.deletePublisher(id);
  }
}
