import { Module } from '@nestjs/common';
import { QuoteItemService } from './quote-item.service';
import { QuoteItemController } from './quote-item.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [QuoteItemController],
  providers: [QuoteItemService, PrismaService],
  exports: [QuoteItemService],
})
export class QuoteItemModule {}
