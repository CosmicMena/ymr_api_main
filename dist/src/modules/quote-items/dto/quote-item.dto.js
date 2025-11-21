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
exports.QuoteItemFilterDto = exports.UpdateQuoteItemDto = exports.CreateQuoteItemDto = exports.QuoteItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QuoteItemDto {
}
exports.QuoteItemDto = QuoteItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do item do orçamento', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da solicitação de orçamento', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteItemDto.prototype, "quoteRequestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do produto', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantidade', example: 2 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], QuoteItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Preço unitário', example: 1000.00, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuoteItemDto.prototype, "unitPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Preço total', example: 2000.00, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuoteItemDto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notas', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuoteItemDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuoteItemDto.prototype, "createdAt", void 0);
class CreateQuoteItemDto extends (0, swagger_1.OmitType)(QuoteItemDto, ['id', 'createdAt']) {
}
exports.CreateQuoteItemDto = CreateQuoteItemDto;
class UpdateQuoteItemDto extends (0, swagger_1.PartialType)(CreateQuoteItemDto) {
}
exports.UpdateQuoteItemDto = UpdateQuoteItemDto;
class QuoteItemFilterDto {
}
exports.QuoteItemFilterDto = QuoteItemFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por solicitação', required: false, example: 'uuid-solicitacao' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteItemFilterDto.prototype, "quoteRequestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por produto', required: false, example: 'uuid-produto' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteItemFilterDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QuoteItemFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QuoteItemFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=quote-item.dto.js.map