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
exports.RolePermissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let RolePermissionService = class RolePermissionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.rolePermission.create({ data });
    }
    async findAll(paginationDto, filterDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const { roleId, permissionId, startDate, endDate } = filterDto || {};
        const where = {};
        if (roleId)
            where.roleId = roleId;
        if (permissionId)
            where.permissionId = permissionId;
        if (startDate || endDate) {
            where.grantedAt = {};
            if (startDate)
                where.grantedAt.gte = new Date(startDate);
            if (endDate)
                where.grantedAt.lte = new Date(endDate);
        }
        const skip = (page - 1) * limit;
        const take = Math.min(limit, 100);
        const [items, total] = await Promise.all([
            this.prisma.rolePermission.findMany({ include: { role: true, permission: true }, where, orderBy: { grantedAt: 'asc' }, skip, take }),
            this.prisma.rolePermission.count({ where }),
        ]);
        const totalPages = Math.ceil(total / take);
        return { data: items, pagination: { page, limit: take, total, totalPages } };
    }
    async findOne(roleId, permissionId) {
        const rp = await this.prisma.rolePermission.findUnique({ where: { roleId_permissionId: { roleId, permissionId } }, include: { role: true, permission: true } });
        if (!rp)
            throw new common_1.NotFoundException(`RolePermission não encontrada`);
        return rp;
    }
    async remove(roleId, permissionId) {
        await this.findOne(roleId, permissionId);
        return this.prisma.rolePermission.delete({ where: { roleId_permissionId: { roleId, permissionId } } });
    }
};
exports.RolePermissionService = RolePermissionService;
exports.RolePermissionService = RolePermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolePermissionService);
//# sourceMappingURL=role-permission.service.js.map