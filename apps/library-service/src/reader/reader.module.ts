import { Module } from '@nestjs/common';
import { ReaderController } from './reader.controller';
import { ReaderService } from './reader.service';
import { ReaderToBookService } from './readerToBook.service';

@Module({
  imports: [],
  controllers: [ReaderController],
  providers: [ReaderService, ReaderToBookService],
})
export class ReaderModule {}
