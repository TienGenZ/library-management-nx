import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { CreateReaderDto } from './dto/createReader.dto';
import { UpdateReaderDto } from './dto/updateReader.dto';

@Injectable()
export class ReaderService {
  constructor(private prisma: PrismaService) {}

  async checkExistReader(id: number) {
    try {
      await this.prisma.reader.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('Reader', error);
    }
  }

  async findAll() {
    try {
      return this.prisma.reader.findMany();
    } catch (error) {
      throw createError('Reader', error);
    }
  }

  async findById(id: number) {
    try {
      const data = await this.prisma.reader.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });
      return data;
    } catch (error) {
      throw createError('Reader', error);
    }
  }

  async create(data: CreateReaderDto) {
    try {
      const reader = await this.prisma.reader.create({
        data,
      });
      return reader;
    } catch (error) {
      throw createError('Reader', error);
    }
  }

  async update(id: number, data: UpdateReaderDto) {
    try {
      await this.checkExistReader(id);
      return this.prisma.reader.update({
        where: { id: Number(id) || undefined },
        data,
      });
    } catch (error) {
      throw createError('Reader', error);
    }
  }

  async delete(id: number) {
    await this.checkExistReader(id);
    try {
      await this.prisma.reader.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('Reader', error);
    }
  }
}
