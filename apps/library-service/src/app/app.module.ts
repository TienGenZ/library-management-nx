import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { BookModule } from '../book/book.module';
import { BookTypeModule } from '../bookType/bookType.module';
import { PolicyModule } from '../policy/policy.module';
import { PublisherModule } from '../publisher/publisher.module';
import { ReaderModule } from '../reader/reader.module';
import { ReaderToBooksModule } from '../readerToBook/readerToBooks.module';
import { PrismaModule } from '../services/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AdminModule,
    ReaderModule,
    BookModule,
    BookTypeModule,
    PublisherModule,
    PolicyModule,
    ReaderToBooksModule,
  ],
})
export class AppModule {}
