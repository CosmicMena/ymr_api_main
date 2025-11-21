import { Module } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivityController } from './user-activity.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [UserActivityController],
  providers: [UserActivityService, PrismaService],
  exports: [UserActivityService],
})
export class UserActivityModule {}
