import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AdminUserDto } from './dto/admin-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AdminUserFilterDto } from './dto/admin-user.dto';

@Injectable()
export class AdminUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<AdminUserDto, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.adminUser.create({
      data,
    });
  }

  async findAll(paginationDto: PaginationDto, filterDto: AdminUserFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { search, roleId, isActive, startDate, endDate } = filterDto || ({} as AdminUserFilterDto);

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (roleId) where.roleId = roleId;
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.adminUser.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.adminUser.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const admin = await this.prisma.adminUser.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Administrador com ID ${id} não encontrado`);
    }

    return admin;
  }

  async update(
    id: string,
    data: Partial<Omit<AdminUserDto, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    return this.prisma.adminUser.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // garante que existe
    return this.prisma.adminUser.delete({
      where: { id },
    });
  }
}
