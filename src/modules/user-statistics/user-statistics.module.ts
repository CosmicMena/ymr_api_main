import { Module } from '@nestjs/common';
import { UserStatisticsService } from './user-statistics.service';
import { UserStatisticsController } from './user-statistics.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [UserStatisticsController],
  providers: [UserStatisticsService, PrismaService],
  exports: [UserStatisticsService],
})
export class UserStatisticsModule {}
