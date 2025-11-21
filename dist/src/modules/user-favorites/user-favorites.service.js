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
exports.UserFavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let UserFavoritesService = class UserFavoritesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.userFavorite.create({ data });
    }
    async findAll() {
        return this.prisma.userFavorite.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const favorite = await this.prisma.userFavorite.findUnique({ where: { id } });
        if (!favorite)
            throw new common_1.NotFoundException('Favorito não encontrado');
        return favorite;
    }
    async findByUser(userId) {
        return this.prisma.userFavorite.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.userFavorite.delete({ where: { id } });
    }
};
exports.UserFavoritesService = UserFavoritesService;
exports.UserFavoritesService = UserFavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserFavoritesService);
//# sourceMappingURL=user-favorites.service.js.map