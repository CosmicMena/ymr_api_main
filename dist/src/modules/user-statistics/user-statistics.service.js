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
exports.UserStatisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let UserStatisticsService = class UserStatisticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.userStatistics.create({ data });
    }
    async findAll() {
        return this.prisma.userStatistics.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const stats = await this.prisma.userStatistics.findUnique({ where: { id } });
        if (!stats)
            throw new common_1.NotFoundException('Estatísticas do usuário não encontradas');
        return stats;
    }
    async findByUserId(userId) {
        const stats = await this.prisma.userStatistics.findUnique({ where: { userId } });
        if (!stats)
            throw new common_1.NotFoundException('Estatísticas do usuário não encontradas');
        return stats;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.userStatistics.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.userStatistics.delete({ where: { id } });
    }
};
exports.UserStatisticsService = UserStatisticsService;
exports.UserStatisticsService = UserStatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserStatisticsService);
//# sourceMappingURL=user-statistics.service.js.map