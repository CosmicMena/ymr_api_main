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
exports.NewsletterSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let NewsletterSubscriptionService = class NewsletterSubscriptionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.newsletterSubscription.create({ data });
    }
    async findAll(paginationDto, filterDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const { email, isActive, interest, startDate, endDate } = filterDto || {};
        const where = {};
        if (email)
            where.email = { contains: email, mode: 'insensitive' };
        if (typeof isActive === 'boolean')
            where.isActive = isActive;
        if (interest)
            where.interests = { has: interest };
        if (startDate || endDate) {
            where.subscribedAt = {};
            if (startDate)
                where.subscribedAt.gte = new Date(startDate);
            if (endDate)
                where.subscribedAt.lte = new Date(endDate);
        }
        const skip = (page - 1) * limit;
        const take = Math.min(limit, 100);
        const [items, total] = await Promise.all([
            this.prisma.newsletterSubscription.findMany({ where, orderBy: { subscribedAt: 'desc' }, skip, take }),
            this.prisma.newsletterSubscription.count({ where }),
        ]);
        const totalPages = Math.ceil(total / take);
        return { data: items, pagination: { page, limit: take, total, totalPages } };
    }
    async findOne(id) {
        const subscription = await this.prisma.newsletterSubscription.findUnique({ where: { id } });
        if (!subscription)
            throw new common_1.NotFoundException(`Inscrição com ID ${id} não encontrada`);
        return subscription;
    }
    async update(id, data) {
        return this.prisma.newsletterSubscription.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.newsletterSubscription.delete({ where: { id } });
    }
};
exports.NewsletterSubscriptionService = NewsletterSubscriptionService;
exports.NewsletterSubscriptionService = NewsletterSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewsletterSubscriptionService);
//# sourceMappingURL=newsletter-subscription.service.js.map