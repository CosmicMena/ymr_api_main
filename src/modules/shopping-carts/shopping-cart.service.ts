import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ShoppingCartDto } from './dto/shopping-cart.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ShoppingCartFilterDto } from './dto/shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<ShoppingCartDto, 'createdAt' | 'updatedAt'>) {
    return this.prisma.shoppingCart.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: ShoppingCartFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { userId, sessionId, productId, startDate, endDate } = filterDto || {} as ShoppingCartFilterDto;

    const where: any = {};
    if (userId) where.userId = userId;
    if (sessionId) where.sessionId = sessionId;
    if (productId) where.productId = productId;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.shoppingCart.findMany({
        where,
        include: { user: true, product: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.shoppingCart.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return {
      data: items,
      pagination: { page, limit: take, total, totalPages },
    };
  }

  async findOne(id: string) {
    const cart = await this.prisma.shoppingCart.findUnique({
      where: { id },
      include: { user: true, product: true },
    });
    if (!cart) throw new NotFoundException(`Carrinho não encontrado`);
    return cart;
  }

  async update(id: string, data: Partial<Omit<ShoppingCartDto, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.findOne(id);
    return this.prisma.shoppingCart.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.shoppingCart.delete({ where: { id } });
  }
}
