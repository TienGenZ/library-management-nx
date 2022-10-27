import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { BookModule } from '../book/book.module';
import { ReaderModule } from '../reader/reader.module';
import { PrismaModule } from '../services/prisma.module';

@Module({
  imports: [PrismaModule, AdminModule, ReaderModule, BookModule],
})
export class AppModule {}
