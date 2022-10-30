import { Module } from '@nestjs/common';
import { BookTypeController } from './bookType.controller';
import { BookTypeService } from './bookType.service';

@Module({
  imports: [],
  controllers: [BookTypeController],
  providers: [BookTypeService],
})
export class BookTypeModule {}
