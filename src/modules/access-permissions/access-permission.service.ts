import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AccessPermissionDto } from './dto/access-permission.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AccessPermissionFilterDto } from './dto/access-permission.dto';

@Injectable()
export class AccessPermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Omit<AccessPermissionDto, 'id' | 'createdAt'>,
  ) {
    return this.prisma.accessPermission.create({
      data,
    });
  }

  async findAll(paginationDto: PaginationDto, filterDto: AccessPermissionFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { search, resource, action, startDate, endDate } = filterDto || ({} as AccessPermissionFilterDto);

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (resource) where.resource = { contains: resource, mode: 'insensitive' };
    if (action) where.action = { contains: action, mode: 'insensitive' };
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.accessPermission.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.accessPermission.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const permission = await this.prisma.accessPermission.findUnique({ where: { id } });

    if (!permission) {
      throw new NotFoundException(
        `Permissão com ID ${id} não encontrada`,
      );
    }

    return permission;
  }

  async update(
    id: string,
    data: Partial<Omit<AccessPermissionDto, 'id' | 'createdAt'>>,
  ) {
    return this.prisma.accessPermission.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // valida existência
    return this.prisma.accessPermission.delete({
      where: { id },
    });
  }
}
