import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { CreatePublisherDto } from './dto/createPublisher.dto';
import { UpdatePublisherDto } from './dto/updatePublisher.dto';

@Injectable()
export class PublisherService {
  constructor(private prisma: PrismaService) {}
  async findAllPublisher() {
    try {
      return this.prisma.publisher.findMany({
        where: {
          deleted: false,
        },
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error) {
      throw createError('Publisher', error);
    }
  }

  async findPublisherById(id: number) {
    try {
      const data = await this.prisma.publisher.findFirstOrThrow({
        where: {
          id: Number(id),
          deleted: false,
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
      return await this.prisma.publisher.update({
        where: {
          id: Number(id),
        },
        data: {
          deleted: true,
        },
      });
    } catch (error) {
      throw createError('Publisher', error);
    }
  }
}
