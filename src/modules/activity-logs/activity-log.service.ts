import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ActivityLogDto } from './dto/activity-log.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ActivityLogFilterDto } from './dto/activity-log.dto';

@Injectable()
export class ActivityLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<ActivityLogDto, 'id' | 'createdAt'>) {
    return this.prisma.activityLog.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: ActivityLogFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { userId, adminId, action, resourceType, startDate, endDate } = filterDto || {} as ActivityLogFilterDto;

    const where: any = {};
    if (userId) where.userId = userId;
    if (adminId) where.adminId = adminId;
    if (action) where.action = { contains: action, mode: 'insensitive' };
    if (resourceType) where.resourceType = { contains: resourceType, mode: 'insensitive' };
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.activityLog.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.activityLog.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return {
      data: items,
      pagination: { page, limit: take, total, totalPages },
    };
  }

  async findOne(id: string) {
    const log = await this.prisma.activityLog.findUnique({ where: { id } });
    if (!log) {
      throw new NotFoundException(`Log com ID ${id} não encontrado`);
    }
    return log;
  }

  async update(id: string, data: Partial<Omit<ActivityLogDto, 'id' | 'createdAt'>>) {
    return this.prisma.activityLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.activityLog.delete({ where: { id } });
  }
}
