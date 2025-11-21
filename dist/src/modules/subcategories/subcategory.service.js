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
exports.SubcategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let SubcategoryService = class SubcategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.subcategory.create({ data });
    }
    async findAll(paginationDto, filterDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const { search, categoryId, isActive } = filterDto || {};
        const where = {};
        if (search)
            where.name = { contains: search, mode: 'insensitive' };
        if (categoryId)
            where.categoryId = categoryId;
        if (typeof isActive === 'boolean')
            where.isActive = isActive;
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
    async findOne(id) {
        const subcategory = await this.prisma.subcategory.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!subcategory)
            throw new common_1.NotFoundException(`Subcategoria não encontrada`);
        return subcategory;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.subcategory.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.subcategory.delete({ where: { id } });
    }
};
exports.SubcategoryService = SubcategoryService;
exports.SubcategoryService = SubcategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubcategoryService);
//# sourceMappingURL=subcategory.service.js.map