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
exports.StatusFilterDto = exports.UpdateStatusDto = exports.CreateStatusDto = exports.StatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class StatusDto {
}
exports.StatusDto = StatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do status', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do status', example: 'Pendente' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição do status', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cor do status (hex)', example: '#FF0000', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status ativo?', example: true, default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], StatusDto.prototype, "isActive", void 0);
class CreateStatusDto extends (0, swagger_1.OmitType)(StatusDto, ['id']) {
}
exports.CreateStatusDto = CreateStatusDto;
class UpdateStatusDto extends (0, swagger_1.PartialType)(CreateStatusDto) {
}
exports.UpdateStatusDto = UpdateStatusDto;
class StatusFilterDto {
}
exports.StatusFilterDto = StatusFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por nome (contém, case-insensitive)', required: false, example: 'pend' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], StatusFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por ativo', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], StatusFilterDto.prototype, "isActive", void 0);
//# sourceMappingURL=status.dto.js.map