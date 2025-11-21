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
exports.BrandFilterDto = exports.UpdateBrandDto = exports.CreateBrandDto = exports.BrandDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BrandDto {
}
exports.BrandDto = BrandDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da marca', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BrandDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome da marca', example: 'Caterpillar' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BrandDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL do logo da marca', example: 'https://exemplo.com/logo.png', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BrandDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição da marca', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BrandDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Marca ativa?', example: true, default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BrandDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BrandDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BrandDto.prototype, "updatedAt", void 0);
class CreateBrandDto extends (0, swagger_1.OmitType)(BrandDto, ['id', 'createdAt', 'updatedAt']) {
}
exports.CreateBrandDto = CreateBrandDto;
class UpdateBrandDto extends (0, swagger_1.PartialType)(CreateBrandDto) {
}
exports.UpdateBrandDto = UpdateBrandDto;
class BrandFilterDto {
}
exports.BrandFilterDto = BrandFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por nome (contém, case-insensitive)', required: false, example: 'cat' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], BrandFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por estado ativo', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BrandFilterDto.prototype, "isActive", void 0);
//# sourceMappingURL=brand.dto.js.map