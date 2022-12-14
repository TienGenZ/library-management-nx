import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiError } from '../errors/api.error';
import { createError } from '../errors/errors';
import { PolicyService } from '../policy/policy.service';
import { PrismaService } from '../services/prisma.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Injectable()
export class BookService {
  constructor(
    private prisma: PrismaService,
    private policyService: PolicyService
  ) {}

  async checkExistBook(id: number) {
    try {
      await this.prisma.book.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('Book', error);
    }
  }

  async findAll() {
    try {
      return this.prisma.book.findMany({
        where: {
          deleted: false,
        },
        orderBy: {
          id: 'asc',
        },
        select: {
          id: true,
          name: true,
          author: true,
          publishedAt: true,
          createdAt: true,
          type: true,
          publisher: true,
          readerToBook: true,
          borrowed: true,
          receivingDate: true,
        },
      });
    } catch (error) {
      throw createError('Book', error);
    }
  }

  async findByQuery(query: string) {
    try {
      return this.prisma.book.findMany({
        select: {
          id: true,
          name: true,
          author: true,
          publishedAt: true,
          createdAt: true,
          type: true,
          publisher: true,
          borrowed: true,
          receivingDate: true,
        },
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              type: {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          ],
          deleted: false,
        },
      });
    } catch (error) {
      throw createError('Book', error);
    }
  }

  async findById(id: number) {
    try {
      const data = await this.prisma.book.findFirstOrThrow({
        where: {
          id: Number(id),
          deleted: false,
        },
        include: {
          type: true,
          publisher: true,
        },
      });
      return data;
    } catch (error) {
      throw createError('Book', error);
    }
  }

  async create(dto: CreateBookDto) {
    const { bookTypeId, publisherId, ...data } = dto;

    const policy = await this.policyService.getPolicy();
    if (policy) {
      const { bookDate } = policy;
      const currentYear = new Date().getFullYear();

      if (currentYear - dto.publishedAt > bookDate) {
        const error = new ApiError({
          message: `Ch??? nh???n s??ch trong v??ng ${bookDate} n??m`,
          statusCode: 422,
        });
        throw createError('ReaderToBooks', error);
      }
    }

    try {
      const book = await this.prisma.book.create({
        data: {
          ...data,
          publisher: {
            connect: {
              id: publisherId,
            },
          },
          type: {
            connect: {
              id: bookTypeId,
            },
          },
        },
        include: {
          type: true,
          publisher: true,
        },
      });
      return book;
    } catch (error) {
      throw createError('Book', error);
    }
  }

  async update(id: number, dto: UpdateBookDto) {
    const { bookTypeId, publisherId, ...data } = dto;
    try {
      await this.checkExistBook(id);
      return this.prisma.book.update({
        where: { id: Number(id) || undefined },
        data: {
          ...data,
          publisher: {
            connect: {
              id: publisherId,
            },
          },
          type: {
            connect: {
              id: bookTypeId,
            },
          },
        },
        include: {
          type: true,
          publisher: true,
        },
      });
    } catch (error) {
      throw createError('Book', error);
    }
  }

  async checkIsBorrowedBook(id: number) {
    try {
      const result = await this.prisma.book.findFirst({
        where: {
          id: id,
          borrowed: true,
        },
      });
      return result;
    } catch (error) {
      throw createError('Book', error);
    }
  }

  async softDelete(id: number) {
    await this.checkExistBook(id);
    const isBorrowed = await this.checkIsBorrowedBook(id);
    if (isBorrowed?.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    try {
      return await this.prisma.book.update({
        where: {
          id: Number(id),
        },
        data: {
          deleted: true,
        },
      });
    } catch (error) {
      throw createError('Book', error);
    }
  }

  async updateBook(id: number, borrowed: boolean) {
    try {
      return this.prisma.book.update({
        where: {
          id: +id,
        },
        data: {
          borrowed: borrowed,
        },
      });
    } catch (error) {
      throw createError('Book', error);
    }
  }
}
