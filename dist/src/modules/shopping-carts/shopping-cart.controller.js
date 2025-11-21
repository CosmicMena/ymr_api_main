"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartController = void 0;
const common_1 = require("@nestjs/common");
const shopping_cart_service_1 = require("./shopping-cart.service");
const shopping_cart_dto_1 = require("./dto/shopping-cart.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let ShoppingCartController = class ShoppingCartController {
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        const created = await this.service.create(data);
        return new response_dto_1.SuccessResponseDto('Cart item created successfully', created);
    }
    async findAll(pagination, filter) {
        const result = await this.service.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Cart items retrieved successfully', result);
    }
    async findOne(id) {
        const data = await this.service.findOne(id);
        return new response_dto_1.SuccessResponseDto('Cart item retrieved successfully', data);
    }
    async update(id, data) {
        const updated = await this.service.update(id, data);
        return new response_dto_1.SuccessResponseDto('Cart item updated successfully', updated);
    }
    async remove(id) {
        await this.service.remove(id);
        return new response_dto_1.SuccessResponseDto('Cart item deleted successfully');
    }
};
exports.ShoppingCartController = ShoppingCartController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Adicionar item ao carrinho' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Item adicionado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar itens do carrinho (paginado)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, type: String, example: 'uuid-user' }),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: false, type: String, example: 'sess-123' }),
    (0, swagger_1.ApiQuery)({ name: 'productId', required: false, type: String, example: 'uuid-product' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Itens retornados com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, shopping_cart_dto_1.ShoppingCartFilterDto]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter item específico do carrinho' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Item encontrado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar item do carrinho' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Item atualizado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover item do carrinho' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Item removido', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "remove", null);
exports.ShoppingCartController = ShoppingCartController = __decorate([
    (0, swagger_1.ApiTags)('ShoppingCarts'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('shopping-carts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [shopping_cart_service_1.ShoppingCartService])
], ShoppingCartController);
//# sourceMappingURL=shopping-cart.controller.js.map