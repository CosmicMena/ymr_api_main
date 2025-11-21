import { Module } from '@nestjs/common';
import { SiteVisitService } from './site-visit.service';
import { SiteVisitController } from './site-visit.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [SiteVisitController],
  providers: [SiteVisitService, PrismaService],
  exports: [SiteVisitService],
})
export class SiteVisitModule {}
