import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserFilterDto } from './dto/user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Verifica se o e-mail já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException(
        `E-mail ${createUserDto.email} já está em uso por outro usuário`,
      );
    }

    return this.prisma.user.create({
      data: createUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        country: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
      },
    });
  }

  async findAll(paginationDto: PaginationDto, filterDto: UserFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { search, city, country, isActive, emailVerified, sortBy = 'createdAt', sortOrder = 'desc' } = filterDto;

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100); // Máximo 100 por página

    // Construir filtros dinâmicos
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (city) {
      where.city = { equals: city, mode: 'insensitive' };
    }

    if (country) {
      where.country = { equals: country, mode: 'insensitive' };
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    if (typeof emailVerified === 'boolean') {
      where.emailVerified = emailVerified;
    }

    // Construir ordenação
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          city: true,
          country: true,
          company: true,
          position: true,
          avatarUrl: true,
          isActive: true,
          emailVerified: true,
          preferredContactMethod: true,
          createdAt: true,
          updatedAt: true,
          lastLogin: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);

    return {
      data: users,
      pagination: {
        page,
        limit: take,
        total,
        totalPages,
      },
    };
  }

  async findActiveUsers(limit: number = 50) {
    return this.prisma.user.findMany({
      where: { isActive: true },
      take: Math.min(limit, 100),
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        country: true,
        company: true,
        isActive: true,
      },
    });
  }

  async getUserStats() {
    const [
      totalUsers,
      activeUsers,
      verifiedUsers,
      newUsersThisMonth,
      usersByCountry,
      usersByCities,
    ] = await Promise.all([
      // Total de usuários
      this.prisma.user.count(),
      
      // Usuários ativos
      this.prisma.user.count({ where: { isActive: true } }),
      
      // Usuários com e-mail verificado
      this.prisma.user.count({ where: { emailVerified: true } }),
      
      // Usuários criados neste mês
      this.prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      
      // Usuários por país (top 10)
      this.prisma.user.groupBy({
        by: ['country'],
        _count: { country: true },
        where: { country: { not: null } },
        orderBy: { _count: { country: 'desc' } },
        take: 10,
      }),
      
      // Usuários por cidade (top 10)
      this.prisma.user.groupBy({
        by: ['city'],
        _count: { city: true },
        where: { city: { not: null } },
        orderBy: { _count: { city: 'desc' } },
        take: 10,
      }),
    ]);

    // Formatar resultados dos agrupamentos
    const countryStats = usersByCountry.reduce((acc, item) => {
      acc[item.country] = item._count.country;
      return acc;
    }, {});

    const cityStats = usersByCities.reduce((acc, item) => {
      acc[item.city] = item._count.city;
      return acc;
    }, {});

    return {
      totalUsers,
      activeUsers,
      verifiedUsers,
      newUsersThisMonth,
      usersByCountry: countryStats,
      usersByCities: cityStats,
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birthDate: true,
        address: true,
        city: true,
        country: true,
        company: true,
        position: true,
        avatarUrl: true,
        emailVerified: true,
        isActive: true,
        preferredContactMethod: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Verifica se o usuário existe
    await this.findOne(id);

    // Se o e-mail está sendo atualizado, verifica se não existe outro usuário com o mesmo e-mail
    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(
          `E-mail ${updateUserDto.email} já está em uso por outro usuário`,
        );
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        country: true,
        isActive: true,
        emailVerified: true,
        updatedAt: true,
      },
    });
  }

  async verifyEmail(id: string) {
    // Verifica se o usuário existe
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: { emailVerified: true },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        updatedAt: true,
      },
    });
  }

  async toggleStatus(id: string) {
    // Busca o usuário atual
    const user = await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    // Verifica se o usuário existe
    await this.findOne(id);

    // Verifica se o usuário tem pedidos ou outras dependências
    const ordersCount = await this.prisma.order?.count({
      where: { userId: id },
    }).catch(() => 0); // Se não existe tabela Order, retorna 0

    if (ordersCount > 0) {
      throw new ConflictException(
        `Não é possível remover o usuário pois possui ${ordersCount} pedido(s) vinculado(s)`,
      );
    }

    // Soft delete ou hard delete dependendo da necessidade
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        updatedAt: true,
      },
    });
  }

  async updateLastLogin(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
      select: {
        id: true,
        lastLogin: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByGoogleId(googleId: string) {
    return this.prisma.user.findFirst({
      where: { googleId },
    });
  }

  async getRecentUsers(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        country: true,
        createdAt: true,
      },
    });
  }
}