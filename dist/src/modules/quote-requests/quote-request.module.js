"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRequestModule = void 0;
const common_1 = require("@nestjs/common");
const quote_request_service_1 = require("./quote-request.service");
const quote_request_controller_1 = require("./quote-request.controller");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let QuoteRequestModule = class QuoteRequestModule {
};
exports.QuoteRequestModule = QuoteRequestModule;
exports.QuoteRequestModule = QuoteRequestModule = __decorate([
    (0, common_1.Module)({
        controllers: [quote_request_controller_1.QuoteRequestController],
        providers: [quote_request_service_1.QuoteRequestService, prisma_service_1.PrismaService],
        exports: [quote_request_service_1.QuoteRequestService],
    })
], QuoteRequestModule);
//# sourceMappingURL=quote-request.module.js.map