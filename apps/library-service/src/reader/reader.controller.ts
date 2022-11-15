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
import { CreateReaderDto } from './dto/createReader.dto';
import { UpdateReaderDto } from './dto/updateReader.dto';
import { ReaderService } from './reader.service';

@Controller('/reader')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Get()
  findAll() {
    return this.readerService.findAll();
  }

  @Get('/search/:query')
  findByQuery(@Param('query') query: string) {
    return this.readerService.findByQuery(query);
  }

  @Post()
  create(@Body() dto: CreateReaderDto) {
    return this.readerService.create(dto);
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.readerService.findById(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: UpdateReaderDto) {
    return this.readerService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.readerService.delete(id);
  }
}
