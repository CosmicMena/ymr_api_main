import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { MessageThreadDto } from './dto/message-thread.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { MessageThreadFilterDto } from './dto/message-thread.dto';

@Injectable()
export class MessageThreadService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<MessageThreadDto, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.messageThread.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: MessageThreadFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { search, userId, adminId, status, priority, startDate, endDate } = filterDto || ({} as MessageThreadFilterDto);

    const where: any = {};
    if (search) where.subject = { contains: search, mode: 'insensitive' };
    if (userId) where.userId = userId;
    if (adminId) where.adminId = adminId;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.messageThread.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      this.prisma.messageThread.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const thread = await this.prisma.messageThread.findUnique({ where: { id } });
    if (!thread) throw new NotFoundException(`Thread com ID ${id} não encontrado`);
    return thread;
  }

  async update(
    id: string,
    data: Partial<Omit<MessageThreadDto, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    return this.prisma.messageThread.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.messageThread.delete({ where: { id } });
  }
}
