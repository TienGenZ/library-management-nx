import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import {
  CreateBookDto,
  CreateBookTypeDto,
  CreatePublisherDto,
} from './dto/createBook.dto';
import {
  UpdateBookDto,
  UpdateBookTypeDto,
  UpdatePublisherDto,
} from './dto/updateBook.dto';

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
      return this.prisma.book.findMany();
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

  async findAllBookType() {
    try {
      return this.prisma.bookType.findMany();
    } catch (error) {
      throw createError('BookType', error);
    }
  }

  async findBookTypeById(id: number) {
    try {
      const data = await this.prisma.bookType.findFirstOrThrow({
        where: {
          id: Number(id),
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
      return await this.prisma.bookType.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('BookType', error);
    }
  }

  async findAllPublisher() {
    try {
      return this.prisma.publisher.findMany();
    } catch (error) {
      throw createError('Publisher', error);
    }
  }

  async findPublisherById(id: number) {
    try {
      const data = await this.prisma.publisher.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });
      return data;
    } catch (error) {
      throw createError('Publisher', error);
    }
  }

  async createPublisher(data: CreatePublisherDto) {
    try {
      const book = await this.prisma.publisher.create({
        data,
      });
      return book;
    } catch (error) {
      throw createError('Publisher', error);
    }
  }

  async updatePublisher(id: number, data: UpdatePublisherDto) {
    try {
      return this.prisma.publisher.update({
        where: { id: Number(id) || undefined },
        data,
      });
    } catch (error) {
      throw createError('Publisher', error);
    }
  }

  async deletePublisher(id: number) {
    try {
      return await this.prisma.publisher.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('Publisher', error);
    }
  }
}
