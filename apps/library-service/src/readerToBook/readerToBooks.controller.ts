import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReaderToBooksDto } from './dto/createReaderToBooks.dto';
import { UpdateReaderToBooksDto } from './dto/updateReaderToBooks.dto';
import { ReaderToBooksQuery } from './query/readerToBooks.query';
import { ReaderToBooksService } from './readerToBooks.service';

@Controller('checkout')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class ReaderToBooksController {
  constructor(private readonly readerToBooksService: ReaderToBooksService) {}

  @Get()
  findAll() {
    return this.readerToBooksService.findAllRecord();
  }

  @Post()
  createReaderToBook(@Body() dto: CreateReaderToBooksDto[]) {
    return this.readerToBooksService.create(dto);
  }

  @Get('/:id')
  findReaderToBookById(@Param('id') id: number) {
    return this.readerToBooksService.findById(id);
  }

  @Put('/:id')
  updateReaderToBook(
    @Param('id') id: number,
    @Body() dto: UpdateReaderToBooksDto
  ) {
    return this.readerToBooksService.update(id, dto);
  }

  @Delete('/:id')
  deleteReaderToBook(@Param('id') id: number) {
    return this.readerToBooksService.delete(id);
  }
}
