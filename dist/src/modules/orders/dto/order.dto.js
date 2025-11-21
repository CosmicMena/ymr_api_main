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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFilterDto = exports.UpdateOrderDto = exports.CreateOrderDto = exports.OrderDto = exports.OrderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OrderItemDto {
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do item do pedido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do produto',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantidade do produto',
        example: 2,
        minimum: 1
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Preço unitário',
        example: 1500.00,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "unitPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Preço total do item',
        example: 3000.00,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observações do item',
        example: 'Produto com garantia estendida',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], OrderItemDto.prototype, "notes", void 0);
class OrderDto {
}
exports.OrderDto = OrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID único do pedido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Código único do pedido',
        example: 'ORD-2024-001'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], OrderDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do usuário que fez o pedido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do status atual do pedido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de serviço',
        example: 'Venda',
        enum: ['Venda', 'Orçamento', 'Serviço', 'Manutenção'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Venda', 'Orçamento', 'Serviço', 'Manutenção']),
    __metadata("design:type", String)
], OrderDto.prototype, "serviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total do pedido',
        example: 15000.00,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Moeda do pedido',
        example: 'AOA',
        enum: ['AOA', 'USD', 'EUR'],
        default: 'AOA'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['AOA', 'USD', 'EUR']),
    __metadata("design:type", String)
], OrderDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas ou observações do pedido',
        example: 'Entrega preferencialmente no período da manhã',
        required: false,
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], OrderDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Endereço de entrega completo',
        example: 'Rua da Independência, 123, Apt 45, Luanda, Angola',
        required: false,
        maxLength: 500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], OrderDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de entrega prevista',
        example: '2024-09-01',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OrderDto.prototype, "deliveryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de criação do pedido',
        example: '2024-08-19T19:00:00.000Z'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data da última atualização',
        example: '2024-08-19T19:00:00.000Z'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDto.prototype, "updatedAt", void 0);
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do usuário que fez o pedido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do status inicial do pedido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de serviço',
        example: 'Venda',
        enum: ['Venda', 'Orçamento', 'Serviço', 'Manutenção'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Venda', 'Orçamento', 'Serviço', 'Manutenção']),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "serviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total do pedido',
        example: 15000.00,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Moeda do pedido',
        example: 'AOA',
        enum: ['AOA', 'USD', 'EUR'],
        default: 'AOA'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['AOA', 'USD', 'EUR']),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas ou observações do pedido',
        example: 'Entrega preferencialmente no período da manhã',
        required: false,
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Endereço de entrega completo',
        example: 'Rua da Independência, 123, Apt 45, Luanda, Angola',
        required: false,
        maxLength: 500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de entrega prevista',
        example: '2024-09-01',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "deliveryDate", void 0);
class UpdateOrderDto {
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do status do pedido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de serviço',
        example: 'Venda',
        enum: ['Venda', 'Orçamento', 'Serviço', 'Manutenção'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Venda', 'Orçamento', 'Serviço', 'Manutenção']),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "serviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total do pedido',
        example: 15000.00,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas ou observações do pedido',
        example: 'Entrega preferencialmente no período da manhã',
        required: false,
        maxLength: 1000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Endereço de entrega completo',
        example: 'Rua da Independência, 123, Apt 45, Luanda, Angola',
        required: false,
        maxLength: 500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de entrega prevista',
        example: '2024-09-01',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "deliveryDate", void 0);
class OrderFilterDto {
}
exports.OrderFilterDto = OrderFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Termo de busca por código do pedido',
        example: 'ORD-2024',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por ID do usuário',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por ID do status',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por tipo de serviço',
        example: 'Venda',
        enum: ['Venda', 'Orçamento', 'Serviço', 'Manutenção'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Venda', 'Orçamento', 'Serviço', 'Manutenção']),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "serviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor mínimo do pedido',
        example: 1000.00,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderFilterDto.prototype, "minAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor máximo do pedido',
        example: 50000.00,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderFilterDto.prototype, "maxAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de início para filtro',
        example: '2024-08-01',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de fim para filtro',
        example: '2024-08-31',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Campo para ordenação',
        example: 'createdAt',
        enum: ['createdAt', 'updatedAt', 'totalAmount', 'deliveryDate', 'code'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['createdAt', 'updatedAt', 'totalAmount', 'deliveryDate', 'code']),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ordem da ordenação',
        example: 'desc',
        enum: ['asc', 'desc'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=order.dto.js.map