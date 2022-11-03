import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { CreatePolicyDto } from './dto/createPolicy.dto';
import { UpdatePolicyDto } from './dto/updatePolicy.dto';

@Injectable()
export class PolicyService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    try {
      const data = await this.prisma.policy.findFirstOrThrow();
      return data;
    } catch (error) {
      throw createError('Policy', error);
    }
  }

  async getPolicy() {
    try {
      const data = await this.prisma.policy.findFirstOrThrow();
      return data;
    } catch (error) {
      throw createError('Policy', error);
    }
  }

  async findById(id: number) {
    try {
      const data = await this.prisma.policy.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });
      return data;
    } catch (error) {
      throw createError('Policy', error);
    }
  }

  async create(data: CreatePolicyDto) {
    try {
      const book = await this.prisma.policy.create({
        data,
      });
      return book;
    } catch (error) {
      throw createError('Policy', error);
    }
  }

  async update(id: number, data: UpdatePolicyDto) {
    try {
      return this.prisma.policy.update({
        where: { id: Number(id) || undefined },
        data,
      });
    } catch (error) {
      throw createError('Policy', error);
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.policy.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('Policy', error);
    }
  }
}
