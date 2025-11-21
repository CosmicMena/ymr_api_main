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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let BrandService = class BrandService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.brand.create({
            data,
        });
    }
    async findAll(paginationDto, filterDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const { search, isActive } = filterDto || {};
        const where = {};
        if (search)
            where.name = { contains: search, mode: 'insensitive' };
        if (typeof isActive === 'boolean')
            where.isActive = isActive;
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
    async findOne(id) {
        const brand = await this.prisma.brand.findUnique({
            where: { id },
        });
        if (!brand) {
            throw new common_1.NotFoundException(`Marca com ID ${id} não encontrada`);
        }
        return brand;
    }
    async update(id, data) {
        const brand = await this.prisma.brand.update({
            where: { id },
            data,
        });
        return brand;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.brand.delete({
            where: { id },
        });
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BrandService);
//# sourceMappingURL=brands.service.js.map