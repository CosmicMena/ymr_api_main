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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException(`E-mail ${createUserDto.email} já está em uso por outro usuário`);
        }
        return this.prisma.user.create({
            data: createUserDto,
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                country: true,
                isActive: true,
                emailVerified: true,
                createdAt: true,
            },
        });
    }
    async findAll(paginationDto, filterDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const { search, city, country, isActive, emailVerified, sortBy = 'createdAt', sortOrder = 'desc' } = filterDto;
        const skip = (page - 1) * limit;
        const take = Math.min(limit, 100);
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { company: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (city) {
            where.city = { equals: city, mode: 'insensitive' };
        }
        if (country) {
            where.country = { equals: country, mode: 'insensitive' };
        }
        if (typeof isActive === 'boolean') {
            where.isActive = isActive;
        }
        if (typeof emailVerified === 'boolean') {
            where.emailVerified = emailVerified;
        }
        const orderBy = {};
        orderBy[sortBy] = sortOrder;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take,
                orderBy,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    city: true,
                    country: true,
                    company: true,
                    position: true,
                    avatarUrl: true,
                    isActive: true,
                    emailVerified: true,
                    preferredContactMethod: true,
                    createdAt: true,
                    updatedAt: true,
                    lastLogin: true,
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        const totalPages = Math.ceil(total / take);
        return {
            data: users,
            pagination: {
                page,
                limit: take,
                total,
                totalPages,
            },
        };
    }
    async findActiveUsers(limit = 50) {
        return this.prisma.user.findMany({
            where: { isActive: true },
            take: Math.min(limit, 100),
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                country: true,
                company: true,
                isActive: true,
            },
        });
    }
    async getUserStats() {
        const [totalUsers, activeUsers, verifiedUsers, newUsersThisMonth, usersByCountry, usersByCities,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { isActive: true } }),
            this.prisma.user.count({ where: { emailVerified: true } }),
            this.prisma.user.count({
                where: {
                    createdAt: {
                        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    },
                },
            }),
            this.prisma.user.groupBy({
                by: ['country'],
                _count: { country: true },
                where: { country: { not: null } },
                orderBy: { _count: { country: 'desc' } },
                take: 10,
            }),
            this.prisma.user.groupBy({
                by: ['city'],
                _count: { city: true },
                where: { city: { not: null } },
                orderBy: { _count: { city: 'desc' } },
                take: 10,
            }),
        ]);
        const countryStats = usersByCountry.reduce((acc, item) => {
            acc[item.country] = item._count.country;
            return acc;
        }, {});
        const cityStats = usersByCities.reduce((acc, item) => {
            acc[item.city] = item._count.city;
            return acc;
        }, {});
        return {
            totalUsers,
            activeUsers,
            verifiedUsers,
            newUsersThisMonth,
            usersByCountry: countryStats,
            usersByCities: cityStats,
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                birthDate: true,
                address: true,
                city: true,
                country: true,
                company: true,
                position: true,
                avatarUrl: true,
                emailVerified: true,
                isActive: true,
                preferredContactMethod: true,
                createdAt: true,
                updatedAt: true,
                lastLogin: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        await this.findOne(id);
        if (updateUserDto.email) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: updateUserDto.email },
            });
            if (existingUser && existingUser.id !== id) {
                throw new common_1.ConflictException(`E-mail ${updateUserDto.email} já está em uso por outro usuário`);
            }
        }
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                country: true,
                isActive: true,
                emailVerified: true,
                updatedAt: true,
            },
        });
    }
    async verifyEmail(id) {
        await this.findOne(id);
        return this.prisma.user.update({
            where: { id },
            data: { emailVerified: true },
            select: {
                id: true,
                email: true,
                emailVerified: true,
                updatedAt: true,
            },
        });
    }
    async toggleStatus(id) {
        const user = await this.findOne(id);
        return this.prisma.user.update({
            where: { id },
            data: { isActive: !user.isActive },
            select: {
                id: true,
                name: true,
                email: true,
                isActive: true,
                updatedAt: true,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        const ordersCount = await this.prisma.order?.count({
            where: { userId: id },
        }).catch(() => 0);
        if (ordersCount > 0) {
            throw new common_1.ConflictException(`Não é possível remover o usuário pois possui ${ordersCount} pedido(s) vinculado(s)`);
        }
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: {
                id: true,
                name: true,
                email: true,
                isActive: true,
                updatedAt: true,
            },
        });
    }
    async updateLastLogin(id) {
        return this.prisma.user.update({
            where: { id },
            data: { lastLogin: new Date() },
            select: {
                id: true,
                lastLogin: true,
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findByGoogleId(googleId) {
        return this.prisma.user.findFirst({
            where: { googleId },
        });
    }
    async getRecentUsers(days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        return this.prisma.user.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                },
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                country: true,
                createdAt: true,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map