"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartModule = void 0;
const common_1 = require("@nestjs/common");
const shopping_cart_service_1 = require("./shopping-cart.service");
const shopping_cart_controller_1 = require("./shopping-cart.controller");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let ShoppingCartModule = class ShoppingCartModule {
};
exports.ShoppingCartModule = ShoppingCartModule;
exports.ShoppingCartModule = ShoppingCartModule = __decorate([
    (0, common_1.Module)({
        controllers: [shopping_cart_controller_1.ShoppingCartController],
        providers: [shopping_cart_service_1.ShoppingCartService, prisma_service_1.PrismaService],
        exports: [shopping_cart_service_1.ShoppingCartService],
    })
], ShoppingCartModule);
//# sourceMappingURL=shopping-cart.module.js.map