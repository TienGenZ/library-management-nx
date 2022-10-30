import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

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
        select: {
          id: true,
          name: true,
          author: true,
          publishedAt: true,
          createdAt: true,
          type: true,
          publisher: true,
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

  async delete(id: number) {
    await this.checkExistBook(id);
    try {
      return await this.prisma.book.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('Book', error);
    }
  }
}
