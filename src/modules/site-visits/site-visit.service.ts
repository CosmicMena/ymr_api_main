import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SiteVisitDto } from './dto/site-visit.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SiteVisitFilterDto } from './dto/site-visit.dto';

@Injectable()
export class SiteVisitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<SiteVisitDto, 'createdAt'>) {
    return this.prisma.siteVisit.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: SiteVisitFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { userId, sessionId, ipAddress, startDate, endDate } = filterDto || {} as SiteVisitFilterDto;

    const where: any = {};
    if (userId) where.userId = userId;
    if (sessionId) where.sessionId = sessionId;
    if (ipAddress) where.ipAddress = { contains: ipAddress, mode: 'insensitive' };
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.siteVisit.findMany({
        where,
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.siteVisit.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return {
      data: items,
      pagination: { page, limit: take, total, totalPages },
    };
  }

  async findOne(id: string) {
    const visit = await this.prisma.siteVisit.findUnique({ where: { id }, include: { user: true } });
    if (!visit) throw new NotFoundException(`Visita não encontrada`);
    return visit;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.siteVisit.delete({ where: { id } });
  }
}
