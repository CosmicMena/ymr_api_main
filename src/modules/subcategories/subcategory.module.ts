import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService, PrismaService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
