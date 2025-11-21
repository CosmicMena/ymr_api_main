import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QuoteRequestDto } from './dto/quote-request.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { QuoteRequestFilterDto } from './dto/quote-request.dto';

@Injectable()
export class QuoteRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<QuoteRequestDto, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.quoteRequest.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: QuoteRequestFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { search, userId, statusId, startDate, endDate } = filterDto || ({} as QuoteRequestFilterDto);

    const where: any = {};
    if (search) where.code = { contains: search, mode: 'insensitive' };
    if (userId) where.userId = userId;
    if (statusId) where.statusId = statusId;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.quoteRequest.findMany({ where, include: { user: true, status: true, quoteItems: true }, orderBy: { createdAt: 'asc' }, skip, take }),
      this.prisma.quoteRequest.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const request = await this.prisma.quoteRequest.findUnique({ where: { id }, include: { user: true, status: true, quoteItems: true } });
    if (!request)
      throw new NotFoundException(`Solicitação de orçamento com ID ${id} não encontrada`);
    return request;
  }

  async update(
    id: string,
    data: Partial<Omit<QuoteRequestDto, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    return this.prisma.quoteRequest.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.quoteRequest.delete({ where: { id } });
  }
}
