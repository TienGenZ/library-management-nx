import { Injectable } from '@nestjs/common';
import { createError } from '../errors/errors';
import { PrismaService } from '../services/prisma.service';
import { signInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
      throw createError('Auth', error);
    }
  }
}
