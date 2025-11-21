"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const user_statistics_service_1 = require("./user-statistics.service");
const user_statistics_controller_1 = require("./user-statistics.controller");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let UserStatisticsModule = class UserStatisticsModule {
};
exports.UserStatisticsModule = UserStatisticsModule;
exports.UserStatisticsModule = UserStatisticsModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_statistics_controller_1.UserStatisticsController],
        providers: [user_statistics_service_1.UserStatisticsService, prisma_service_1.PrismaService],
        exports: [user_statistics_service_1.UserStatisticsService],
    })
], UserStatisticsModule);
//# sourceMappingURL=user-statistics.module.js.map