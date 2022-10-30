import { Module } from '@nestjs/common';
import { ReaderToBooksController } from './readerToBooks.controller';
import { ReaderToBooksService } from './readerToBooks.service';

@Module({
  imports: [],
  controllers: [ReaderToBooksController],
  providers: [ReaderToBooksService],
})
export class ReaderToBooksModule {}
