import { Module } from '@nestjs/common';
import { BrandService } from './brands.service';
import { BrandController } from './brands.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, PrismaService],
  exports: [BrandService], // caso precises usar noutra entidade (ex: Product)
})
export class BrandModule {}
