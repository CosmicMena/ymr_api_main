import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { StatusDto } from './dto/status.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { StatusFilterDto } from './dto/status.dto';

@Injectable()
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<StatusDto, 'id'>) {
    return this.prisma.status.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: StatusFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { search, isActive } = filterDto || ({} as StatusFilterDto);

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (typeof isActive === 'boolean') where.isActive = isActive;

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.status.findMany({ where, orderBy: { name: 'asc' }, skip, take }),
      this.prisma.status.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const status = await this.prisma.status.findUnique({ where: { id } });
    if (!status) throw new NotFoundException(`Status não encontrado`);
    return status;
  }

  async update(id: string, data: Partial<Omit<StatusDto, 'id'>>) {
    await this.findOne(id);
    return this.prisma.status.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.status.delete({ where: { id } });
  }
}
