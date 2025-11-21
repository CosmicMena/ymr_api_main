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
exports.SiteVisitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let SiteVisitService = class SiteVisitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.siteVisit.create({ data });
    }
    async findAll(paginationDto, filterDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const { userId, sessionId, ipAddress, startDate, endDate } = filterDto || {};
        const where = {};
        if (userId)
            where.userId = userId;
        if (sessionId)
            where.sessionId = sessionId;
        if (ipAddress)
            where.ipAddress = { contains: ipAddress, mode: 'insensitive' };
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate)
                where.createdAt.gte = new Date(startDate);
            if (endDate)
                where.createdAt.lte = new Date(endDate);
        }
        const skip = (page - 1) * limit;
        const take = Math.min(limit, 100);
        const [items, total] = await Promise.all([
            this.prisma.siteVisit.findMany({
                where,
                include: { user: true },
                orderBy: { createdAt: 'desc' },
                skip,
                take,
            }),
            this.prisma.siteVisit.count({ where }),
        ]);
        const totalPages = Math.ceil(total / take);
        return {
            data: items,
            pagination: { page, limit: take, total, totalPages },
        };
    }
    async findOne(id) {
        const visit = await this.prisma.siteVisit.findUnique({ where: { id }, include: { user: true } });
        if (!visit)
            throw new common_1.NotFoundException(`Visita não encontrada`);
        return visit;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.siteVisit.delete({ where: { id } });
    }
};
exports.SiteVisitService = SiteVisitService;
exports.SiteVisitService = SiteVisitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SiteVisitService);
//# sourceMappingURL=site-visit.service.js.map