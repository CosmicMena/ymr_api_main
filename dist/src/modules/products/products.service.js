"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const existingProduct = await this.prisma.product.findUnique({
            where: { code: createProductDto.code },
        });
        if (existingProduct) {
            throw new common_1.ConflictException('Product with this code already exists');
        }
        if (createProductDto.brandId) {
            const brand = await this.prisma.brand.findUnique({
                where: { id: createProductDto.brandId },
            });
            if (!brand) {
                throw new common_1.NotFoundException('Brand not found');
            }
        }
        if (createProductDto.subcategoryId) {
            const subcategory = await this.prisma.subcategory.findUnique({
                where: { id: createProductDto.subcategoryId },
            });
            if (!subcategory) {
                throw new common_1.NotFoundException('Subcategory not found');
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
    async findAll(paginationDto, filterDto) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = paginationDto;
        const { brandId, subcategoryId, categoryId, minPrice, maxPrice, isActive } = filterDto;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
                { model: { contains: search, mode: 'insensitive' } },
            ];
        }
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
        const orderBy = {};
        orderBy[sortBy] = sortOrder;
        return this.prisma.paginate(this.prisma.product, {
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
        }, page, limit);
    }
    async findOne(id) {
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
            throw new common_1.NotFoundException('Product not found');
        }
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
    async update(id, updateProductDto) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (updateProductDto.code && updateProductDto.code !== product.code) {
            const existingProduct = await this.prisma.product.findUnique({
                where: { code: updateProductDto.code },
            });
            if (existingProduct) {
                throw new common_1.ConflictException('Product with this code already exists');
            }
        }
        if (updateProductDto.brandId) {
            const brand = await this.prisma.brand.findUnique({
                where: { id: updateProductDto.brandId },
            });
            if (!brand) {
                throw new common_1.NotFoundException('Brand not found');
            }
        }
        if (updateProductDto.subcategoryId) {
            const subcategory = await this.prisma.subcategory.findUnique({
                where: { id: updateProductDto.subcategoryId },
            });
            if (!subcategory) {
                throw new common_1.NotFoundException('Subcategory not found');
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
    async remove(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.prisma.product.delete({
            where: { id },
        });
    }
    async getPopularProducts(limit = 10) {
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
    async getFeaturedProducts(limit = 10) {
        return this.prisma.product.findMany({
            where: {
                isActive: true,
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
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map