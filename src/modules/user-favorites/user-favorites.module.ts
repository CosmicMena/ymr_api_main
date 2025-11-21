import { Module } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { UserFavoritesController } from './user-favorites.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [UserFavoritesController],
  providers: [UserFavoritesService, PrismaService],
  exports: [UserFavoritesService],
})
export class UserFavoritesModule {}
