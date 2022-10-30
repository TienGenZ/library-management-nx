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
import { CreatePublisherDto } from './dto/createPublisher.dto';
import { UpdatePublisherDto } from './dto/updatePublisher.dto';
import { PublisherService } from './publisher.service';

@Controller('/publisher')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
  findAllPublisher() {
    return this.publisherService.findAllPublisher();
  }

  @Post()
  createPublisher(@Body() dto: CreatePublisherDto) {
    return this.publisherService.createPublisher(dto);
  }

  @Get('/:id')
  findPublisherById(@Param('id') id: number) {
    return this.publisherService.findPublisherById(id);
  }

  @Put('/:id')
  updatePublisher(@Param('id') id: number, @Body() dto: UpdatePublisherDto) {
    return this.publisherService.updatePublisher(id, dto);
  }

  @Delete('/:id')
  deletePublisher(@Param('id') id: number) {
    return this.publisherService.deletePublisher(id);
  }
}
