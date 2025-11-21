import { Module } from '@nestjs/common';
import { MessageThreadService } from './message-thread.service';
import { MessageThreadController } from './message-thread.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [MessageThreadController],
  providers: [MessageThreadService, PrismaService],
  exports: [MessageThreadService],
})
export class MessageThreadModule {}
