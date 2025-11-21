import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { MessageDto } from './dto/message.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { MessageFilterDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<MessageDto, 'id' | 'createdAt'>) {
    return this.prisma.message.create({ data });
  }

  async findAll(paginationDto: PaginationDto, filterDto: MessageFilterDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const { threadId, senderId, isUnread, startDate, endDate } = filterDto || ({} as MessageFilterDto);

    const where: any = {};
    if (threadId) where.threadId = threadId;
    if (senderId) where.senderId = senderId;
    if (typeof isUnread === 'boolean') where.isRead = !isUnread ? undefined : undefined;
    // Nota: para isUnread, ajustaremos consulta: se true => isRead = false; se false => sem filtro
    if (typeof isUnread === 'boolean') {
      if (isUnread) where.isRead = false;
    }
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [items, total] = await Promise.all([
      this.prisma.message.findMany({ where, orderBy: { createdAt: 'asc' }, skip, take }),
      this.prisma.message.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { data: items, pagination: { page, limit: take, total, totalPages } };
  }

  async findOne(id: string) {
    const message = await this.prisma.message.findUnique({ where: { id } });
    if (!message) throw new NotFoundException(`Mensagem com ID ${id} não encontrada`);
    return message;
  }

  async update(
    id: string,
    data: Partial<Omit<MessageDto, 'id' | 'createdAt'>>,
  ) {
    return this.prisma.message.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.message.delete({ where: { id } });
  }
}
