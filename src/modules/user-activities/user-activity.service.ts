import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserActivityDto } from './dto/user-activity.dto';

@Injectable()
export class UserActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<UserActivityDto, 'id'>) {
    return this.prisma.userActivity.create({ data });
  }

  async findAll() {
    return this.prisma.userActivity.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
  }

  async findOne(id: string) {
    const activity = await this.prisma.userActivity.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!activity) throw new NotFoundException('Atividade não encontrada');
    return activity;
  }

  async update(id: string, data: Partial<Omit<UserActivityDto, 'id'>>) {
    await this.findOne(id);
    return this.prisma.userActivity.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.userActivity.delete({ where: { id } });
  }
}
