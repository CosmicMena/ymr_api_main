import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserStatisticsDto } from './dto/user-statistics.dto';

@Injectable()
export class UserStatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<UserStatisticsDto, 'id'>) {
    return this.prisma.userStatistics.create({ data });
  }

  async findAll() {
    return this.prisma.userStatistics.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const stats = await this.prisma.userStatistics.findUnique({ where: { id } });
    if (!stats) throw new NotFoundException('Estatísticas do usuário não encontradas');
    return stats;
  }

  async findByUserId(userId: string) {
    const stats = await this.prisma.userStatistics.findUnique({ where: { userId } });
    if (!stats) throw new NotFoundException('Estatísticas do usuário não encontradas');
    return stats;
  }

  async update(id: string, data: Partial<Omit<UserStatisticsDto, 'id'>>) {
    await this.findOne(id);
    return this.prisma.userStatistics.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.userStatistics.delete({ where: { id } });
  }
}