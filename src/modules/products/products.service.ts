import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto/product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // Check if product code already exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { code: createProductDto.code },
    });

    if (existingProduct) {
      throw new ConflictException('Product with this code already exists');
    }

    // Verify brand and subcategory exist
    if (createProductDto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: createProductDto.brandId },
      });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    if (createProductDto.subcategoryId) {
      const subcategory = await this.prisma.subcategory.findUnique({
        where: { id: createProductDto.subcategoryId },
      });
      if (!subcategory) {
        throw new NotFoundException('Subcategory not found');
      }
    }

    return this.prisma.product.create({
      data: createProductDto,
      include: {
        brand: true,
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto, filterDto: ProductFilterDto) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = paginationDto;
    const { brandId, subcategoryId, categoryId, minPrice, maxPrice, isActive } = filterDto;

    const where: any = {};

    // Search functionality
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filters
    if (brandId) {
      where.brandId = brandId;
    }

    if (subcategoryId) {
      where.subcategoryId = subcategoryId;
    }

    if (categoryId) {
      where.subcategory = {
        categoryId: categoryId,
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    return this.prisma.paginate(
      this.prisma.product,
      {
        where,
        orderBy,
        include: {
          brand: true,
          subcategory: {
            include: {
              category: true,
            },
          },
        },
      },
      page,
      limit,
    );
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        subcategory: {
          include: {
            category: true,
          },
        },
        _count: {
          select: {
            userFavorites: true,
            quoteItems: true,
            orderItems: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Increment view count
    await this.prisma.product.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if new code conflicts with existing products
    if (updateProductDto.code && updateProductDto.code !== product.code) {
      const existingProduct = await this.prisma.product.findUnique({
        where: { code: updateProductDto.code },
      });

      if (existingProduct) {
        throw new ConflictException('Product with this code already exists');
      }
    }

    // Verify brand and subcategory exist if provided
    if (updateProductDto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: updateProductDto.brandId },
      });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    if (updateProductDto.subcategoryId) {
      const subcategory = await this.prisma.subcategory.findUnique({
        where: { id: updateProductDto.subcategoryId },
      });
      if (!subcategory) {
        throw new NotFoundException('Subcategory not found');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        brand: true,
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getPopularProducts(limit: number = 10) {
    return this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { viewCount: 'desc' },
      take: limit,
      include: {
        brand: true,
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async getFeaturedProducts(limit: number = 10) {
    return this.prisma.product.findMany({
      where: { 
        isActive: true,
        // You can add more criteria for featured products
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        brand: true,
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}