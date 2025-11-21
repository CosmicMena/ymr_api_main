import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto, CategoryFilterDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    // Verifica se já existe uma categoria com o mesmo nome
    const existingCategory = await this.prisma.category.findFirst({
      where: { name: { equals: data.name, mode: 'insensitive' } },
    });

    if (existingCategory) {
      throw new ConflictException('Já existe uma categoria com este nome');
    }

    return this.prisma.category.create({
      data,
      include: {
        subcategories: true,
        _count: {
          select: {
            subcategories: true,
          },
        },
      },
    });
  }

  async findAll(filterDto?: CategoryFilterDto) {
    const where: any = {};

    // Aplicar filtros se fornecidos
    if (filterDto?.search) {
      where.OR = [
        { name: { contains: filterDto.search, mode: 'insensitive' } },
        { description: { contains: filterDto.search, mode: 'insensitive' } },
      ];
    }

    if (filterDto?.isActive !== undefined) {
      where.isActive = filterDto.isActive;
    }

    return this.prisma.category.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        subcategories: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            subcategories: true,
          },
        },
      },
    });
  }

  async findActiveCategories() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        isActive: true,
        _count: {
          select: {
            subcategories: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subcategories: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            subcategories: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }

    return category;
  }

  async update(
    id: string,
    data: UpdateCategoryDto,
  ) {
    // Verifica se a categoria existe antes de atualizar
    await this.findOne(id);
    
    // Se estiver atualizando o nome, verifica se já existe outro com o mesmo nome
    if (data.name) {
      const existingCategory = await this.prisma.category.findFirst({
        where: { 
          name: { equals: data.name, mode: 'insensitive' },
          id: { not: id }
        },
      });

      if (existingCategory) {
        throw new ConflictException('Já existe uma categoria com este nome');
      }
    }
    
    return this.prisma.category.update({
      where: { id },
      data,
      include: {
        subcategories: true,
        _count: {
          select: {
            subcategories: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    // Valida existência
    await this.findOne(id);
    
    // Verifica se existem produtos vinculados à categoria
    const productsCount = await this.prisma.product.count({
      where: { 
        subcategory: {
          categoryId: id
        }
      },
    });

    if (productsCount > 0) {
      throw new ConflictException(
        `Não é possível remover a categoria pois existem ${productsCount} produto(s) vinculado(s)`
      );
    }

    // Verifica se existem subcategorias vinculadas
    const subcategoriesCount = await this.prisma.subcategory.count({
      where: { categoryId: id },
    });

    if (subcategoriesCount > 0) {
      throw new ConflictException(
        `Não é possível remover a categoria pois existem ${subcategoriesCount} subcategoria(s) vinculada(s)`
      );
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}