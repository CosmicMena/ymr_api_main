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
exports.ActivityLogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let ActivityLogService = class ActivityLogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.activityLog.create({ data });
    }
    async findAll(paginationDto, filterDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const { userId, adminId, action, resourceType, startDate, endDate } = filterDto || {};
        const where = {};
        if (userId)
            where.userId = userId;
        if (adminId)
            where.adminId = adminId;
        if (action)
            where.action = { contains: action, mode: 'insensitive' };
        if (resourceType)
            where.resourceType = { contains: resourceType, mode: 'insensitive' };
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
            this.prisma.activityLog.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
            this.prisma.activityLog.count({ where }),
        ]);
        const totalPages = Math.ceil(total / take);
        return {
            data: items,
            pagination: { page, limit: take, total, totalPages },
        };
    }
    async findOne(id) {
        const log = await this.prisma.activityLog.findUnique({ where: { id } });
        if (!log) {
            throw new common_1.NotFoundException(`Log com ID ${id} não encontrado`);
        }
        return log;
    }
    async update(id, data) {
        return this.prisma.activityLog.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.activityLog.delete({ where: { id } });
    }
};
exports.ActivityLogService = ActivityLogService;
exports.ActivityLogService = ActivityLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivityLogService);
//# sourceMappingURL=activity-log.service.js.map