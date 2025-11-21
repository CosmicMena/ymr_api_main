"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterSubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const newsletter_subscription_service_1 = require("./newsletter-subscription.service");
const newsletter_subscription_controller_1 = require("./newsletter-subscription.controller");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let NewsletterSubscriptionModule = class NewsletterSubscriptionModule {
};
exports.NewsletterSubscriptionModule = NewsletterSubscriptionModule;
exports.NewsletterSubscriptionModule = NewsletterSubscriptionModule = __decorate([
    (0, common_1.Module)({
        controllers: [newsletter_subscription_controller_1.NewsletterSubscriptionController],
        providers: [newsletter_subscription_service_1.NewsletterSubscriptionService, prisma_service_1.PrismaService],
        exports: [newsletter_subscription_service_1.NewsletterSubscriptionService],
    })
], NewsletterSubscriptionModule);
//# sourceMappingURL=newsletter-subscription.module.js.map