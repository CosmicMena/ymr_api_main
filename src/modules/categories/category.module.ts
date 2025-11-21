import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  exports: [CategoryService], // caso outro módulo precise consultar categorias
})
export class CategoryModule {}
