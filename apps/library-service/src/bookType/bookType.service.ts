import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { CreateBookTypeDto } from './dto/createBookType.dto';
import { UpdateBookTypeDto } from './dto/updateBookType.dto';

@Injectable()
export class BookTypeService {
  constructor(private prisma: PrismaService) {}
  async findAllBookType() {
    try {
      return this.prisma.bookType.findMany({
        where: {
          deleted: false,
        },
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error) {
      throw createError('BookType', error);
    }
  }

  async findBookTypeById(id: number) {
    try {
      const data = await this.prisma.bookType.findFirstOrThrow({
        where: {
          id: Number(id),
          deleted: false,
        },
      });
      return data;
    } catch (error) {
      throw createError('BookType', error);
    }
  }

  async createBookType(data: CreateBookTypeDto) {
    try {
      const book = await this.prisma.bookType.create({
        data,
      });
      return book;
    } catch (error) {
      throw createError('BookType', error);
    }
  }

  async updateBookType(id: number, data: UpdateBookTypeDto) {
    try {
      return this.prisma.bookType.update({
        where: { id: Number(id) || undefined },
        data,
      });
    } catch (error) {
      throw createError('BookType', error);
    }
  }

  async deleteBookType(id: number) {
    try {
      return await this.prisma.bookType.update({
        where: {
          id: Number(id),
        },
        data: {
          deleted: true,
        },
      });
    } catch (error) {
      throw createError('BookType', error);
    }
  }
}
