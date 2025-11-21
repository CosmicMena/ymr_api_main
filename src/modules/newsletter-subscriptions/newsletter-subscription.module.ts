import { Module } from '@nestjs/common';
import { NewsletterSubscriptionService } from './newsletter-subscription.service';
import { NewsletterSubscriptionController } from './newsletter-subscription.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [NewsletterSubscriptionController],
  providers: [NewsletterSubscriptionService, PrismaService],
  exports: [NewsletterSubscriptionService],
})
export class NewsletterSubscriptionModule {}
