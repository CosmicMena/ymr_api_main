import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

// Database
import { PrismaModule } from './common/prisma/prisma.module';

// Authentication & Authorization
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { AdminUserModule } from './modules/admin-users/admin-user.module';
import { AccessPermissionModule } from './modules/access-permissions/access-permission.module';
import { RolePermissionModule } from './modules/role-permissions/role-permission.module';
import { UserRolesModule } from './modules/user-roles/user-roles.module';

// Core Business Modules
import { ProductsModule } from './modules/products/products.module';
import { CategoryModule } from './modules/categories/category.module';
import { SubcategoryModule } from './modules/subcategories/subcategory.module';
import { BrandModule } from './modules/brands/brands.module';
import { OrderModule } from './modules/orders/order.module';
import { OrderItemModule } from './modules/order-items/order-item.module';
import { QuoteRequestModule } from './modules/quote-requests/quote-request.module';
import { QuoteItemModule } from './modules/quote-items/quote-item.module';
import { MessageModule } from './modules/messages/message.module';
import { MessageThreadModule } from './modules/message-threads/message-thread.module';

// User Related Modules
import { UserFavoritesModule } from './modules/user-favorites/user-favorites.module';
import { UserActivityModule } from './modules/user-activities/user-activity.module';
import { UserStatisticsModule } from './modules/user-statistics/user-statistics.module';

// Utility & Analytics Modules
import { NewsletterSubscriptionModule } from './modules/newsletter-subscriptions/newsletter-subscription.module';
import { ShoppingCartModule } from './modules/shopping-carts/shopping-cart.module';
import { SiteVisitModule } from './modules/site-visits/site-visit.module';
import { ActivityLogModule } from './modules/activity-logs/activity-log.module';
import { StatusModule } from './modules/statuses/status.module';
import { HealthModule } from './modules/health/health.module';

// Middleware
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SecurityMiddleware } from './common/middleware/security.middleware';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Throttling
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ([
        {
          ttl: Number(config.get('THROTTLE_TTL', 60)) * 1000,
          limit: Number(config.get('THROTTLE_LIMIT', 100)),
        },
      ]),
    }),

    // Caching
    CacheModule.register({
      ttl: 300, // 5 minutes
      max: 100, // maximum number of items in cache
      isGlobal: true,
    }),

    // Database
    PrismaModule,

    // Authentication & Users
    AuthModule,
    UserModule,
    AdminUserModule,
    AccessPermissionModule,
    RolePermissionModule,
    UserRolesModule,

    // Core Business
    ProductsModule,
    CategoryModule,
    SubcategoryModule,
    BrandModule,
    OrderModule,
    OrderItemModule,
    QuoteRequestModule,
    QuoteItemModule,
    MessageModule,
    MessageThreadModule,

    // User Related
    UserFavoritesModule,
    UserActivityModule,
    UserStatisticsModule,

    // Utilities & Analytics
    NewsletterSubscriptionModule,
    ShoppingCartModule,
    SiteVisitModule,
    ActivityLogModule,
    StatusModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, SecurityMiddleware)
      .forRoutes('*');
  }
}