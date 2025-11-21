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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingCategory = await this.prisma.category.findFirst({
            where: { name: { equals: data.name, mode: 'insensitive' } },
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Já existe uma categoria com este nome');
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
    async findAll(filterDto) {
        const where = {};
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Categoria com ID ${id} não encontrada`);
        }
        return category;
    }
    async update(id, data) {
        await this.findOne(id);
        if (data.name) {
            const existingCategory = await this.prisma.category.findFirst({
                where: {
                    name: { equals: data.name, mode: 'insensitive' },
                    id: { not: id }
                },
            });
            if (existingCategory) {
                throw new common_1.ConflictException('Já existe uma categoria com este nome');
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
    async remove(id) {
        await this.findOne(id);
        const productsCount = await this.prisma.product.count({
            where: {
                subcategory: {
                    categoryId: id
                }
            },
        });
        if (productsCount > 0) {
            throw new common_1.ConflictException(`Não é possível remover a categoria pois existem ${productsCount} produto(s) vinculado(s)`);
        }
        const subcategoriesCount = await this.prisma.subcategory.count({
            where: { categoryId: id },
        });
        if (subcategoriesCount > 0) {
            throw new common_1.ConflictException(`Não é possível remover a categoria pois existem ${subcategoriesCount} subcategoria(s) vinculada(s)`);
        }
        return this.prisma.category.delete({
            where: { id },
        });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map