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
exports.UserStatisticsFilterDto = exports.UpdateUserStatisticsDto = exports.UserStatisticsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserStatisticsDto {
}
exports.UserStatisticsDto = UserStatisticsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID das estatísticas', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserStatisticsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do usuário', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserStatisticsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de pedidos', example: 5 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UserStatisticsDto.prototype, "ordersCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de consultas', example: 2 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UserStatisticsDto.prototype, "consultationsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de alugueis', example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UserStatisticsDto.prototype, "rentalsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pontos de fidelidade', example: 100 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UserStatisticsDto.prototype, "loyaltyPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total gasto', example: 15000.00 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserStatisticsDto.prototype, "totalSpent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data da última atividade', example: '2024-08-19T19:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserStatisticsDto.prototype, "lastActivity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserStatisticsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserStatisticsDto.prototype, "updatedAt", void 0);
class UpdateUserStatisticsDto extends (0, swagger_1.PartialType)(UserStatisticsDto) {
}
exports.UpdateUserStatisticsDto = UpdateUserStatisticsDto;
class UserStatisticsFilterDto {
}
exports.UserStatisticsFilterDto = UserStatisticsFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por usuário', required: false, example: 'uuid-user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserStatisticsFilterDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mínimo de pedidos', required: false, example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UserStatisticsFilterDto.prototype, "minOrders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mínimo de gastos', required: false, example: 1000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserStatisticsFilterDto.prototype, "minTotalSpent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (lastActivity >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UserStatisticsFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (lastActivity <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UserStatisticsFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=user-statistics.dto.js.map