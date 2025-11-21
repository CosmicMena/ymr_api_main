import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { OrderItemDto } from './dto/order-item.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { OrderItemFilterDto } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<OrderItemDto, 'id' | 'createdAt'>) {
    return this.prisma.orderItem.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: OrderItemFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { orderId, productId, startDate, endDate } = filterDto || ({} as OrderItemFilterDto);

    const where: any = {};
    if (orderId) where.orderId = orderId;
    if (productId) where.productId = productId;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.orderItem.findMany({ where, orderBy: { createdAt: 'asc' }, skip, take }),
      this.prisma.orderItem.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const item = await this.prisma.orderItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Item do pedido com ID ${id} não encontrado`);
    return item;
  }

  async update(id: string, data: Partial<Omit<OrderItemDto, 'id' | 'createdAt'>>) {
    return this.prisma.orderItem.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.orderItem.delete({ where: { id } });
  }
}
