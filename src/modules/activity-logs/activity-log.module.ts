import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [ActivityLogController],
  providers: [ActivityLogService, PrismaService],
  exports: [ActivityLogService], // caso outra entidade precise consultar logs
})
export class ActivityLogModule {}
