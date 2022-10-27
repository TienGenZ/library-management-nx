import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { signInDto } from './dto/signIn.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async checkExistUser(id: number) {
    try {
      await this.prisma.admin.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('Admin', error);
    }
  }

  async signIn(dto: signInDto) {
    const { username, password } = dto;
    try {
      const data = await this.prisma.admin.findFirstOrThrow({
        where: {
          username,
          password,
        },
      });
      delete data.password;
      return data;
    } catch (error) {
      throw createError('Admin', error);
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.admin.findMany();
      const result = data.map((user) => delete user.password);
      return result;
    } catch (error) {
      throw createError('Admin', error);
    }
  }

  async findById(id: number) {
    try {
      const data = await this.prisma.admin.findFirstOrThrow({
        where: {
          id: Number(id),
        },
      });
      delete data.password;
      return data;
    } catch (error) {
      throw createError('Admin', error);
    }
  }

  async create(data: CreateAdminDto) {
    try {
      const user = await this.prisma.admin.create({
        data,
      });
      return user;
    } catch (error) {
      throw createError('Admin', error);
    }
  }

  async update(id: number, data: UpdateAdminDto) {
    try {
      await this.checkExistUser(id);
      return this.prisma.admin.update({
        where: { id: Number(id) || undefined },
        data,
      });
    } catch (error) {
      throw createError('User', error);
    }
  }

  async delete(id: number) {
    await this.checkExistUser(id);
    try {
      await this.prisma.admin.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw createError('Admin', error);
    }
  }
}
