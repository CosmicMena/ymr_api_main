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
exports.OrderItemController = void 0;
const common_1 = require("@nestjs/common");
const order_item_service_1 = require("./order-item.service");
const order_item_dto_1 = require("./dto/order-item.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let OrderItemController = class OrderItemController {
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        const created = await this.service.create(data);
        return new response_dto_1.SuccessResponseDto('Order item created successfully', created);
    }
    async findAll(pagination, filter) {
        const result = await this.service.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Order items retrieved successfully', result);
    }
    async findOne(id) {
        const entity = await this.service.findOne(id);
        return new response_dto_1.SuccessResponseDto('Order item retrieved successfully', entity);
    }
    async update(id, data) {
        const updated = await this.service.update(id, data);
        return new response_dto_1.SuccessResponseDto('Order item updated successfully', updated);
    }
    async remove(id) {
        await this.service.remove(id);
        return new response_dto_1.SuccessResponseDto('Order item deleted successfully');
    }
};
exports.OrderItemController = OrderItemController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('orderItems.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo item de pedido', description: 'Cria um item de pedido vinculado a um pedido e opcionalmente a um produto.' }),
    (0, swagger_1.ApiBody)({
        type: order_item_dto_1.OrderItemDto,
        description: 'Dados do item do pedido (exceto id, createdAt)',
        examples: {
            produto: {
                summary: 'Item com produto',
                value: { orderId: 'uuid-pedido', productId: 'uuid-produto', quantity: 2, unitPrice: 1500.00, totalPrice: 3000.00 }
            },
            servico: {
                summary: 'Item de serviço',
                value: { orderId: 'uuid-pedido', serviceDescription: 'Instalação em campo', quantity: 1, unitPrice: 5000.00, totalPrice: 5000.00 }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Item criado com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar itens' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar itens de pedidos (paginado)', description: 'Retorna os itens de pedido com filtros por pedido/produto e período.' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'orderId', required: false, type: String, example: 'uuid-order' }),
    (0, swagger_1.ApiQuery)({ name: 'productId', required: false, type: String, example: 'uuid-product' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Itens retornados com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, order_item_dto_1.OrderItemFilterDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter um item pelo ID', description: 'Retorna os detalhes de um item do pedido pelo seu ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Item encontrado', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Item não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('orderItems.update'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um item pelo ID', description: 'Atualiza campos parciais de um item do pedido.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiBody)({
        type: order_item_dto_1.OrderItemDto,
        description: 'Campos para atualização',
        examples: {
            atualizarQtd: { summary: 'Atualizar quantidade', value: { quantity: 3, totalPrice: 4500.00 } },
            atualizarServico: { summary: 'Atualizar descrição do serviço', value: { serviceDescription: 'Instalação premium em campo' } }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Item atualizado com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Item não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar itens' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('orderItems.delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover um item pelo ID', description: 'Remove um item de pedido pelo seu ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Item removido com sucesso', type: response_dto_1.SuccessResponseDto, schema: { example: { success: true, message: 'Order item deleted successfully', data: null } } }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Item não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover itens' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "remove", null);
exports.OrderItemController = OrderItemController = __decorate([
    (0, swagger_1.ApiTags)('OrderItems'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('order-items'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [order_item_service_1.OrderItemService])
], OrderItemController);
//# sourceMappingURL=order-item.controller.js.map