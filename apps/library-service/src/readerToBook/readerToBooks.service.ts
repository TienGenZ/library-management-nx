import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { CreateReaderToBooksDto } from './dto/createReaderToBooks.dto';
import { UpdateReaderToBooksDto } from './dto/updateReaderToBooks.dto';
import { ReaderToBooksQuery } from './query/readerToBooks.query';

@Injectable()
export class ReaderToBooksService {
  constructor(private prisma: PrismaService) {}

  async findAllRecord() {
    try {
      return this.prisma.readerToBook.findMany();
    } catch (error) {
      throw createError('ReaderToBook', error);
    }
  }

  async findByQuery(query: ReaderToBooksQuery) {
    try {
      return this.prisma.readerToBook.findMany({
        where: {
          ...query,
        },
      });
    } catch (error) {
      throw createError('ReaderToBook', error);
    }
  }

  async findById(id: number) {
    try {
      const data = await this.prisma.readerToBook.findFirstOrThrow({
        where: {
          id: Number(id),
        },
        include: {
          reader: true,
          book: true,
        },
      });
      return data;
    } catch (error) {
      throw createError('ReaderToBook', error);
    }
  }

  async findByReaderIdAndBookId(readerId: number, bookId: number) {
    try {
      const data = await this.prisma.readerToBook.findFirstOrThrow({
        where: {
          id: 1,
          readerId: Number(readerId),
          bookId: Number(bookId),
        },
        include: {
          reader: true,
          book: true,
        },
      });
      return data;
    } catch (error) {
      throw createError('ReaderToBook', error);
    }
  }

  async create(dto: CreateReaderToBooksDto) {
    const { readerId, bookId, ...data } = dto;
    try {
      const reader = await this.prisma.readerToBook.create({
        data: {
          ...data,
          reader: {
            connect: {
              id: readerId,
            },
          },
          book: {
            connect: {
              id: bookId,
            },
          },
        },
        include: {
          reader: true,
          book: true,
        },
      });
      return reader;
    } catch (error) {
      throw createError('ReaderToBook', error);
    }
  }

  async update(id: number, data: UpdateReaderToBooksDto) {
    try {
      return this.prisma.readerToBook.update({
        where: { id: Number(id) || undefined },
        data,
      });
    } catch (error) {
      throw createError('ReaderToBook', error);
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.readerToBook.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('ReaderToBook', error);
    }
  }
}
