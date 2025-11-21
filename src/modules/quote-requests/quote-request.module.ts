import { Module } from '@nestjs/common';
import { QuoteRequestService } from './quote-request.service';
import { QuoteRequestController } from './quote-request.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [QuoteRequestController],
  providers: [QuoteRequestService, PrismaService],
  exports: [QuoteRequestService],
})
export class QuoteRequestModule {}
