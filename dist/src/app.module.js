"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const config_2 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const prisma_module_1 = require("./common/prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/users/user.module");
const admin_user_module_1 = require("./modules/admin-users/admin-user.module");
const access_permission_module_1 = require("./modules/access-permissions/access-permission.module");
const role_permission_module_1 = require("./modules/role-permissions/role-permission.module");
const user_roles_module_1 = require("./modules/user-roles/user-roles.module");
const products_module_1 = require("./modules/products/products.module");
const category_module_1 = require("./modules/categories/category.module");
const subcategory_module_1 = require("./modules/subcategories/subcategory.module");
const brands_module_1 = require("./modules/brands/brands.module");
const order_module_1 = require("./modules/orders/order.module");
const order_item_module_1 = require("./modules/order-items/order-item.module");
const quote_request_module_1 = require("./modules/quote-requests/quote-request.module");
const quote_item_module_1 = require("./modules/quote-items/quote-item.module");
const message_module_1 = require("./modules/messages/message.module");
const message_thread_module_1 = require("./modules/message-threads/message-thread.module");
const user_favorites_module_1 = require("./modules/user-favorites/user-favorites.module");
const user_activity_module_1 = require("./modules/user-activities/user-activity.module");
const user_statistics_module_1 = require("./modules/user-statistics/user-statistics.module");
const newsletter_subscription_module_1 = require("./modules/newsletter-subscriptions/newsletter-subscription.module");
const shopping_cart_module_1 = require("./modules/shopping-carts/shopping-cart.module");
const site_visit_module_1 = require("./modules/site-visits/site-visit.module");
const activity_log_module_1 = require("./modules/activity-logs/activity-log.module");
const status_module_1 = require("./modules/statuses/status.module");
const health_module_1 = require("./modules/health/health.module");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const security_middleware_1 = require("./common/middleware/security.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware, security_middleware_1.SecurityMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [config_2.ConfigService],
                useFactory: (config) => ([
                    {
                        ttl: Number(config.get('THROTTLE_TTL', 60)) * 1000,
                        limit: Number(config.get('THROTTLE_LIMIT', 100)),
                    },
                ]),
            }),
            cache_manager_1.CacheModule.register({
                ttl: 300,
                max: 100,
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            admin_user_module_1.AdminUserModule,
            access_permission_module_1.AccessPermissionModule,
            role_permission_module_1.RolePermissionModule,
            user_roles_module_1.UserRolesModule,
            products_module_1.ProductsModule,
            category_module_1.CategoryModule,
            subcategory_module_1.SubcategoryModule,
            brands_module_1.BrandModule,
            order_module_1.OrderModule,
            order_item_module_1.OrderItemModule,
            quote_request_module_1.QuoteRequestModule,
            quote_item_module_1.QuoteItemModule,
            message_module_1.MessageModule,
            message_thread_module_1.MessageThreadModule,
            user_favorites_module_1.UserFavoritesModule,
            user_activity_module_1.UserActivityModule,
            user_statistics_module_1.UserStatisticsModule,
            newsletter_subscription_module_1.NewsletterSubscriptionModule,
            shopping_cart_module_1.ShoppingCartModule,
            site_visit_module_1.SiteVisitModule,
            activity_log_module_1.ActivityLogModule,
            status_module_1.StatusModule,
            health_module_1.HealthModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map