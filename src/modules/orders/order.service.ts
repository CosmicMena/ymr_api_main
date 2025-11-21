import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto, OrderFilterDto } from './dto/order.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    // Verifica se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: createOrderDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verifica se o status existe
    const status = await this.prisma.status.findUnique({
      where: { id: createOrderDto.statusId },
    });

    if (!status) {
      throw new NotFoundException('Status não encontrado');
    }

    // Gera código único do pedido
    const orderCode = await this.generateUniqueOrderCode();

    return this.prisma.order.create({
      data: {
        code: orderCode,
        userId: createOrderDto.userId,
        statusId: createOrderDto.statusId,
        serviceType: createOrderDto.serviceType,
        totalAmount: createOrderDto.totalAmount,
        currency: createOrderDto.currency,
        notes: createOrderDto.notes,
        deliveryAddress: createOrderDto.deliveryAddress,
        deliveryDate: createOrderDto.deliveryDate ? new Date(createOrderDto.deliveryDate) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                code: true,
                price: true,
              },
            },
          },
        },
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto, filterDto: OrderFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { 
      search, 
      userId, 
      statusId, 
      serviceType, 
      minAmount,
      maxAmount,
      startDate,
      endDate,
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = filterDto;

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100); // Máximo 100 por página

    // Construir filtros dinâmicos
    const where: any = {};

    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (userId) {
      where.userId = userId;
    }

    if (statusId) {
      where.statusId = statusId;
    }

    if (serviceType) {
      where.serviceType = serviceType;
    }

    if (minAmount !== undefined || maxAmount !== undefined) {
      where.totalAmount = {};
      if (minAmount !== undefined) {
        where.totalAmount.gte = minAmount;
      }
      if (maxAmount !== undefined) {
        where.totalAmount.lte = maxAmount;
      }
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Construir ordenação
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          status: {
            select: {
              id: true,
              name: true,
            },
          },
          orderItems: {
            select: {
              id: true,
              quantity: true,
              unitPrice: true,
              totalPrice: true,
            },
          },
          _count: {
            select: {
              orderItems: true,
            },
          },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);

    return {
      data: orders,
      pagination: {
        page,
        limit: take,
        total,
        totalPages,
      },
    };
  }

  async findActiveOrders(limit: number = 50) {
    return this.prisma.order.findMany({
      take: Math.min(limit, 100),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });
  }

  async findUrgentOrders(limit: number = 20) {
    // Como não temos campo isUrgent no schema, vamos retornar pedidos recentes
    return this.prisma.order.findMany({
      take: Math.min(limit, 100),
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOrderStats() {
    const [
      totalOrders,
      ordersThisMonth,
      ordersByStatus,
      ordersByServiceType,
      totalRevenue,
      averageOrderValue,
    ] = await Promise.all([
      // Total de pedidos
      this.prisma.order.count(),
      
      // Pedidos deste mês
      this.prisma.order.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      
      // Pedidos por status
      this.prisma.order.groupBy({
        by: ['statusId'],
        _count: { statusId: true },
      }),
      
      // Pedidos por tipo de serviço
      this.prisma.order.groupBy({
        by: ['serviceType'],
        _count: { serviceType: true },
        where: { serviceType: { not: null } },
      }),
      
      // Receita total
      this.prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
      
      // Valor médio dos pedidos
      this.prisma.order.aggregate({
        _avg: { totalAmount: true },
      }),
    ]);

    return {
      totalOrders,
      ordersThisMonth,
      ordersByStatus: ordersByStatus.reduce((acc, item) => {
        acc[item.statusId] = item._count.statusId;
        return acc;
      }, {}),
      ordersByServiceType: ordersByServiceType.reduce((acc, item) => {
        acc[item.serviceType] = item._count.serviceType;
        return acc;
      }, {}),
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      averageOrderValue: averageOrderValue._avg.totalAmount || 0,
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            country: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                code: true,
                price: true,
                description: true,
                brand: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    // Verifica se o pedido existe
    await this.findOne(id);

    // Se estiver atualizando o status, verifica se existe
    if (updateOrderDto.statusId) {
      const status = await this.prisma.status.findUnique({
        where: { id: updateOrderDto.statusId },
      });

      if (!status) {
        throw new NotFoundException('Status não encontrado');
      }
    }

    // Prepara os dados para atualização
    const updateData: any = {};
    
    if (updateOrderDto.statusId) updateData.statusId = updateOrderDto.statusId;
    if (updateOrderDto.serviceType) updateData.serviceType = updateOrderDto.serviceType;
    if (updateOrderDto.totalAmount) updateData.totalAmount = updateOrderDto.totalAmount;
    if (updateOrderDto.notes) updateData.notes = updateOrderDto.notes;
    if (updateOrderDto.deliveryAddress) updateData.deliveryAddress = updateOrderDto.deliveryAddress;
    if (updateOrderDto.deliveryDate) updateData.deliveryDate = new Date(updateOrderDto.deliveryDate);

    return this.prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
          },
        },
        orderItems: true,
      },
    });
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    // Verifica se o pedido pode ser removido
    if (order.orderItems && order.orderItems.length > 0) {
      throw new ConflictException('Não é possível remover um pedido com itens');
    }

    return this.prisma.order.delete({
      where: { id },
    });
  }

  private async generateUniqueOrderCode(): Promise<string> {
    const year = new Date().getFullYear();
    let counter = 1;
    let orderCode: string;

    do {
      orderCode = `ORD-${year}-${counter.toString().padStart(3, '0')}`;
      const existingOrder = await this.prisma.order.findUnique({
        where: { code: orderCode },
      });
      
      if (!existingOrder) {
        return orderCode;
      }
      
      counter++;
    } while (counter <= 999);

    throw new Error('Não foi possível gerar um código único para o pedido');
  }
}
