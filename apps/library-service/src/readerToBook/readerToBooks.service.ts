import { Injectable } from '@nestjs/common';
import { ApiError } from '../errors/api.error';
import { createError } from '../errors/errors';
import { PolicyService } from '../policy/policy.service';
import { ReaderService } from '../reader/reader.service';
import { PrismaService } from '../services/prisma.service';
import { CreateReaderToBooksDto } from './dto/createReaderToBooks.dto';
import { UpdateReaderToBooksDto } from './dto/updateReaderToBooks.dto';
import { ReaderToBooksQuery } from './query/readerToBooks.query';

@Injectable()
export class ReaderToBooksService {
  constructor(
    private prisma: PrismaService,
    private readonly policyService: PolicyService,
    private readonly readerService: ReaderService
  ) {}

  async findAllRecord() {
    try {
      return this.prisma.readerToBook.findMany({
        include: {
          reader: true,
          book: {
            include: { type: true },
          },
        },
      });
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

  async findAllByReaderId(id: number) {
    try {
      const data = await this.prisma.readerToBook.findFirstOrThrow({
        where: {
          readerId: Number(id),
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

    await this.readerService.checkExpired(Number(readerId));
    const policy = await this.policyService.getPolicy();
    const { maxDate = 4 } = policy;
    if (policy) {
      const { maxBooks, maxDate } = policy;
      const count = await this.prisma.readerToBook.count({
        where: {
          readerId: Number(readerId),
          returned: false,
        },
      });

      if (count >= maxBooks) {
        const error = new ApiError({
          message: 'Đã vượt quá số lượng sách mượn tối đa',
          statusCode: 422,
        });
        throw createError('ReaderToBooks', error);
      }
    }

    try {
      const today = new Date();
      const expiredAt = `${new Date(today.setDate(today.getDate() + maxDate)).toISOString()}`;
      const reader = await this.prisma.readerToBook.create({
        data: {
          returned: false,
          expiredAt,
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
