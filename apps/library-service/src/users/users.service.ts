import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async checkExistUser(id: number) {
    try {
      await this.prisma.user.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('User', error);
    }
  }

  async getUser(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async createUser() {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: 'admin',
          name: 'Thu Mai',
          email: 'admin@admin.com',
          role: 'ADMIN',
        },
      });
      return newUser;
    } catch (error) {
      throw createError('User', error);
    }
  }

  async updateUser(id: number) {
    try {
      await this.checkExistUser(id);
      return this.prisma.user.update({
        where: { id: Number(id) || undefined },
        data: {
          username: 'admin',
          name: 'Thu Mai',
          email: 'admin123@admin.com',
          role: 'ADMIN',
        },
      });
    } catch (error) {
      throw createError('User', error);
    }
  }
}
