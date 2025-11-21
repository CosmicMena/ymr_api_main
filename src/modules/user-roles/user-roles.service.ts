import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserRoleDto } from './dto/user-role.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UserRoleFilterDto } from './dto/user-role.dto';

@Injectable()
export class UserRolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<UserRoleDto, 'id'>) {
    return this.prisma.userRole.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: UserRoleFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { name, isActive, startDate, endDate } = filterDto || ({} as UserRoleFilterDto);

    const where: any = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.userRole.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.userRole.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const role = await this.prisma.userRole.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Papel não encontrado');
    return role;
  }

  async update(id: string, data: Partial<Omit<UserRoleDto, 'id'>>) {
    await this.findOne(id);
    return this.prisma.userRole.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.userRole.delete({ where: { id } });
  }
}
