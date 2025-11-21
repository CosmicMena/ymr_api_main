import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SubcategoryDto } from './dto/subcategory.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SubcategoryFilterDto } from './dto/subcategory.dto';

@Injectable()
export class SubcategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<SubcategoryDto, 'id'>) {
    return this.prisma.subcategory.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: SubcategoryFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { search, categoryId, isActive } = filterDto || ({} as SubcategoryFilterDto);

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (categoryId) where.categoryId = categoryId;
    if (typeof isActive === 'boolean') where.isActive = isActive;

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.subcategory.findMany({
        where,
        orderBy: { name: 'asc' },
        include: { category: true },
        skip,
        take,
      }),
      this.prisma.subcategory.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const subcategory = await this.prisma.subcategory.findUnique({ 
      where: { id },
      include: { category: true },
    });
    if (!subcategory) throw new NotFoundException(`Subcategoria não encontrada`);
    return subcategory;
  }

  async update(id: string, data: Partial<Omit<SubcategoryDto, 'id'>>) {
    await this.findOne(id);
    return this.prisma.subcategory.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.subcategory.delete({ where: { id } });
  }
}
