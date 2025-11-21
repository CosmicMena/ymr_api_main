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
exports.QuoteRequestFilterDto = exports.UpdateQuoteRequestDto = exports.CreateQuoteRequestDto = exports.QuoteRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QuoteRequestDto {
}
exports.QuoteRequestDto = QuoteRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da solicitação de orçamento', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código da solicitação', example: 'Q-2024-001' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do usuário', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do status', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de itens', example: 3 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], QuoteRequestDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notas do usuário', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notas do admin', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "adminNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de expiração', example: '2024-09-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuoteRequestDto.prototype, "updatedAt", void 0);
class CreateQuoteRequestDto extends (0, swagger_1.OmitType)(QuoteRequestDto, ['id', 'code', 'createdAt', 'updatedAt']) {
}
exports.CreateQuoteRequestDto = CreateQuoteRequestDto;
class UpdateQuoteRequestDto extends (0, swagger_1.PartialType)(CreateQuoteRequestDto) {
}
exports.UpdateQuoteRequestDto = UpdateQuoteRequestDto;
class QuoteRequestFilterDto {
}
exports.QuoteRequestFilterDto = QuoteRequestFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por código (contém)', required: false, example: 'Q-2024' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], QuoteRequestFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por usuário', required: false, example: 'uuid-usuario' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteRequestFilterDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por status', required: false, example: 'uuid-status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QuoteRequestFilterDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QuoteRequestFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QuoteRequestFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=quote-request.dto.js.map