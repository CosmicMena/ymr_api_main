import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { NewsletterSubscriptionDto } from './dto/newsletter-subscription.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { NewsletterSubscriptionFilterDto } from './dto/newsletter-subscription.dto';

@Injectable()
export class NewsletterSubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<NewsletterSubscriptionDto, 'id' | 'subscribedAt' | 'unsubscribedAt'>) {
    return this.prisma.newsletterSubscription.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: NewsletterSubscriptionFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { email, isActive, interest, startDate, endDate } = filterDto || ({} as NewsletterSubscriptionFilterDto);

    const where: any = {};
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (interest) where.interests = { has: interest };
    if (startDate || endDate) {
      where.subscribedAt = {};
      if (startDate) where.subscribedAt.gte = new Date(startDate);
      if (endDate) where.subscribedAt.lte = new Date(endDate);
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

  async findOne(id: string) {
    const subscription = await this.prisma.newsletterSubscription.findUnique({ where: { id } });
    if (!subscription) throw new NotFoundException(`Inscrição com ID ${id} não encontrada`);
    return subscription;
  }

  async update(
    id: string,
    data: Partial<Omit<NewsletterSubscriptionDto, 'id' | 'subscribedAt' | 'unsubscribedAt'>>,
  ) {
    return this.prisma.newsletterSubscription.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.newsletterSubscription.delete({ where: { id } });
  }
}
