"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteVisitModule = void 0;
const common_1 = require("@nestjs/common");
const site_visit_service_1 = require("./site-visit.service");
const site_visit_controller_1 = require("./site-visit.controller");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let SiteVisitModule = class SiteVisitModule {
};
exports.SiteVisitModule = SiteVisitModule;
exports.SiteVisitModule = SiteVisitModule = __decorate([
    (0, common_1.Module)({
        controllers: [site_visit_controller_1.SiteVisitController],
        providers: [site_visit_service_1.SiteVisitService, prisma_service_1.PrismaService],
        exports: [site_visit_service_1.SiteVisitService],
    })
], SiteVisitModule);
//# sourceMappingURL=site-visit.module.js.map