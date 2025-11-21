import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RolePermissionDto } from './dto/role-permission.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RolePermissionFilterDto } from './dto/role-permission.dto';

@Injectable()
export class RolePermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<RolePermissionDto, 'grantedAt'>) {
    return this.prisma.rolePermission.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: RolePermissionFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { roleId, permissionId, startDate, endDate } = filterDto || ({} as RolePermissionFilterDto);

    const where: any = {};
    if (roleId) where.roleId = roleId;
    if (permissionId) where.permissionId = permissionId;
    if (startDate || endDate) {
      where.grantedAt = {};
      if (startDate) where.grantedAt.gte = new Date(startDate);
      if (endDate) where.grantedAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.rolePermission.findMany({ include: { role: true, permission: true }, where, orderBy: { grantedAt: 'asc' }, skip, take }),
      this.prisma.rolePermission.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(roleId: string, permissionId: string) {
    const rp = await this.prisma.rolePermission.findUnique({ where: { roleId_permissionId: { roleId, permissionId } }, include: { role: true, permission: true } });
    if (!rp) throw new NotFoundException(`RolePermission não encontrada`);
    return rp;
  }

  async remove(roleId: string, permissionId: string) {
    await this.findOne(roleId, permissionId);
    return this.prisma.rolePermission.delete({ where: { roleId_permissionId: { roleId, permissionId } } });
  }
}
