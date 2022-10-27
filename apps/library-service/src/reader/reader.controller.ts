import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateReaderDto } from './dto/createReader.dto';
import { CreateReaderToBookDto } from './dto/createReaderToBook.dto';
import { UpdateReaderDto } from './dto/updateReader.dto';
import { UpdateReaderToBookDto } from './dto/updateReaderToBook.dto';
import { ReaderToBookQuery } from './query/readerToBook.query';
import { ReaderService } from './reader.service';
import { ReaderToBookService } from './readerToBook.service';

@Controller()
export class ReaderController {
  constructor(
    private readonly readerService: ReaderService,
    private readonly readerToBookService: ReaderToBookService
  ) {}

  @Get('/reader')
  findAll() {
    return this.readerService.findAll();
  }

  @Post('/reader')
  create(@Body() dto: CreateReaderDto) {
    return this.readerService.create(dto);
  }

  @Get('/reader/:id')
  findById(@Param('id') id: number) {
    return this.readerService.findById(id);
  }

  @Put('/reader/:id')
  update(@Param('id') id: number, @Body() dto: UpdateReaderDto) {
    return this.readerService.update(id, dto);
  }

  @Delete('/reader/:id')
  delete(@Param('id') id: number) {
    return this.readerService.delete(id);
  }

  @Get('/reader/books')
  findByQuery(@Query() query: ReaderToBookQuery) {
    return this.readerToBookService.findByQuery(query);
  }

  @Post('/reader/books')
  createReaderToBook(@Body() dto: CreateReaderToBookDto) {
    return this.readerToBookService.create(dto);
  }

  @Get('/reader/books/:id')
  findReaderToBookById(@Param('id') id: number) {
    return this.readerToBookService.findById(id);
  }

  @Put('/reader/books/:id')
  updateReaderToBook(
    @Param('id') id: number,
    @Body() dto: UpdateReaderToBookDto
  ) {
    return this.readerToBookService.update(id, dto);
  }

  @Delete('/reader/books/:id')
  deleteReaderToBook(@Param('id') id: number) {
    return this.readerToBookService.delete(id);
  }
}
