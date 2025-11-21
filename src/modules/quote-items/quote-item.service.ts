import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QuoteItemDto } from './dto/quote-item.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { QuoteItemFilterDto } from './dto/quote-item.dto';

@Injectable()
export class QuoteItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<QuoteItemDto, 'id' | 'createdAt'>) {
    return this.prisma.quoteItem.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: QuoteItemFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { quoteRequestId, productId, startDate, endDate } = filterDto || ({} as QuoteItemFilterDto);

    const where: any = {};
    if (quoteRequestId) where.quoteRequestId = quoteRequestId;
    if (productId) where.productId = productId;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.quoteItem.findMany({ where, include: { product: true, quoteRequest: true }, orderBy: { createdAt: 'asc' }, skip, take }),
      this.prisma.quoteItem.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const item = await this.prisma.quoteItem.findUnique({ where: { id }, include: { product: true, quoteRequest: true } });
    if (!item) throw new NotFoundException(`Item de orçamento com ID ${id} não encontrado`);
    return item;
  }

  async update(
    id: string,
    data: Partial<Omit<QuoteItemDto, 'id' | 'createdAt'>>,
  ) {
    return this.prisma.quoteItem.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.quoteItem.delete({ where: { id } });
  }
}
