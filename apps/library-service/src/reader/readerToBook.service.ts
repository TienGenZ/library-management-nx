import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { CreateReaderToBookDto } from './dto/createReaderToBook.dto';
import { UpdateReaderToBookDto } from './dto/updateReaderToBook.dto';
import { ReaderToBookQuery } from './query/readerToBook.query';

@Injectable()
export class ReaderToBookService {
  constructor(private prisma: PrismaService) {}

  async findByQuery(query: ReaderToBookQuery) {
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

  async create(dto: CreateReaderToBookDto) {
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

  async update(id: number, data: UpdateReaderToBookDto) {
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
