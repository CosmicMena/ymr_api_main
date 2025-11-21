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
exports.ActivityLogFilterDto = exports.UpdateActivityLogDto = exports.CreateActivityLogDto = exports.ActivityLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ActivityLogDto {
}
exports.ActivityLogDto = ActivityLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do log', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do usuário', example: 'uuid', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do admin', example: 'uuid', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ação', example: 'login' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de recurso', example: 'User', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do recurso', example: 'uuid', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Endereço IP', example: '192.168.0.1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User Agent', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Metadados (JSON)', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ActivityLogDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityLogDto.prototype, "createdAt", void 0);
class CreateActivityLogDto extends (0, swagger_1.OmitType)(ActivityLogDto, ['id', 'createdAt']) {
}
exports.CreateActivityLogDto = CreateActivityLogDto;
class UpdateActivityLogDto extends (0, swagger_1.PartialType)(CreateActivityLogDto) {
}
exports.UpdateActivityLogDto = UpdateActivityLogDto;
class ActivityLogFilterDto {
}
exports.ActivityLogFilterDto = ActivityLogFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por usuário', required: false, example: 'uuid-user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActivityLogFilterDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por admin', required: false, example: 'uuid-admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActivityLogFilterDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por ação', required: false, example: 'login' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ActivityLogFilterDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por tipo de recurso', required: false, example: 'User' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityLogFilterDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ActivityLogFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ActivityLogFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=activity-log.dto.js.map