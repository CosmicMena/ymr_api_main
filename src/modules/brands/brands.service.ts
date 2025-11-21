import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { BrandDto } from './dto/brand.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { BrandFilterDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<BrandDto, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.brand.create({
      data,
    });
  }

  async findAll(paginationDto: PaginationDto, filterDto: BrandFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { search, isActive } = filterDto || ({} as BrandFilterDto);

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (typeof isActive === 'boolean') where.isActive = isActive;

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.brand.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.brand.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return {
      data: items,
      pagination: { page, limit: take, total, totalPages },
    };
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID ${id} não encontrada`);
    }

    return brand;
  }

  async update(id: string, data: Partial<Omit<BrandDto, 'id' | 'createdAt' | 'updatedAt'>>) {
    const brand = await this.prisma.brand.update({
      where: { id },
      data,
    });

    return brand;
  }

  async remove(id: string) {
    await this.findOne(id); // garante que existe
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}
