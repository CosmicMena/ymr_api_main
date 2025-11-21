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
exports.StatusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let StatusService = class StatusService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.status.create({ data });
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
            this.prisma.status.findMany({ where, orderBy: { name: 'asc' }, skip, take }),
            this.prisma.status.count({ where }),
        ]);
        const totalPages = Math.ceil(total / take);
        return { data: items, pagination: { page, limit: take, total, totalPages } };
    }
    async findOne(id) {
        const status = await this.prisma.status.findUnique({ where: { id } });
        if (!status)
            throw new common_1.NotFoundException(`Status não encontrado`);
        return status;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.status.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.status.delete({ where: { id } });
    }
};
exports.StatusService = StatusService;
exports.StatusService = StatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatusService);
//# sourceMappingURL=status.service.js.map