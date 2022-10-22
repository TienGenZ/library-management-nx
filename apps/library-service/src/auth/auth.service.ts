import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUser(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async createUser() {
    return this.prisma.user.create({
      data: {
        username: 'admin',
        name: 'Thu Mai',
        email: 'admin@admin.com',
        role: 'ADMIN',
      },
    });
  }
}
