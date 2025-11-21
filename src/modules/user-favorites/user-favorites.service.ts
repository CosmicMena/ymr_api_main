import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserFavoriteDto } from './dto/user-favorite.dto';

@Injectable()
export class UserFavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<UserFavoriteDto, 'id' | 'createdAt'>) {
    return this.prisma.userFavorite.create({ data });
  }

  async findAll() {
    return this.prisma.userFavorite.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const favorite = await this.prisma.userFavorite.findUnique({ where: { id } });
    if (!favorite) throw new NotFoundException('Favorito não encontrado');
    return favorite;
  }

  async findByUser(userId: string) {
    return this.prisma.userFavorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.userFavorite.delete({ where: { id } });
  }
}
