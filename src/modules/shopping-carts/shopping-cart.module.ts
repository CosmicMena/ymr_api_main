import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, PrismaService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
