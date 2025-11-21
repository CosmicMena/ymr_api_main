"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageThreadModule = void 0;
const common_1 = require("@nestjs/common");
const message_thread_service_1 = require("./message-thread.service");
const message_thread_controller_1 = require("./message-thread.controller");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let MessageThreadModule = class MessageThreadModule {
};
exports.MessageThreadModule = MessageThreadModule;
exports.MessageThreadModule = MessageThreadModule = __decorate([
    (0, common_1.Module)({
        controllers: [message_thread_controller_1.MessageThreadController],
        providers: [message_thread_service_1.MessageThreadService, prisma_service_1.PrismaService],
        exports: [message_thread_service_1.MessageThreadService],
    })
], MessageThreadModule);
//# sourceMappingURL=message-thread.module.js.map