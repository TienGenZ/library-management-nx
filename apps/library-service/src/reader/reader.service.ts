import { Injectable } from '@nestjs/common';
import { ApiError } from '../errors/api.error';
import { createError } from '../errors/errors';
import { PolicyService } from '../policy/policy.service';
import { PrismaService } from '../services/prisma.service';
import { CreateReaderDto } from './dto/createReader.dto';
import { UpdateReaderDto } from './dto/updateReader.dto';

@Injectable()
export class ReaderService {
  constructor(
    private prisma: PrismaService,
    private readonly policyService: PolicyService
  ) {}

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

  async checkExpired(id: number) {
    try {
      const result = await this.prisma.reader.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });

      const today = new Date();
      const expired = new Date(result.expiredAt);
      if (expired < today) {
        const error = new ApiError({
          message: 'Thẻ độc giả đã hết hạn',
          statusCode: 422,
        });
        throw createError('Reader', error);
      }
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
    const policy = await this.policyService.getPolicy();
    const { cardReaderDuration } = policy;
    if (policy) {
      const age = this.calculateAge(data.dob);
      const { minAge, maxAge } = policy;
      if (age < minAge) {
        const error = new ApiError({
          message: 'Độc giả chưa đủ tuổi theo quy định',
          statusCode: 422,
        });
        throw createError('Reader', error);
      }
      if (age > maxAge) {
        const error = new ApiError({
          message: 'Độc giả vượt quá tuổi theo quy định',
          statusCode: 422,
        });
        throw createError('Reader', error);
      }
    }
    try {
      const today = new Date();
      const expiredAt = new Date(
        today.setMonth(today.getMonth() + cardReaderDuration)
      );

      const reader = await this.prisma.reader.create({
        data: {
          ...data,
          expiredAt,
        },
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

  private calculateAge(birthday) {
    // birthday is a date
    const dateBirthday = new Date(birthday);
    const ageDifMs = Date.now() - dateBirthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.round(ageDate.getUTCFullYear() - 1970);
  }
}
