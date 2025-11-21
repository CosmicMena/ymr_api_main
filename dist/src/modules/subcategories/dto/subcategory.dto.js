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
exports.SubcategoryListQueryDto = exports.SubcategoryFilterDto = exports.UpdateSubcategoryDto = exports.CreateSubcategoryDto = exports.SubcategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
class SubcategoryDto {
}
exports.SubcategoryDto = SubcategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da subcategoria', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubcategoryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome da subcategoria', example: 'Geradores Industriais' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubcategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da categoria', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubcategoryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subcategoria ativa?', example: true, default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubcategoryDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubcategoryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubcategoryDto.prototype, "updatedAt", void 0);
class CreateSubcategoryDto extends (0, swagger_1.OmitType)(SubcategoryDto, ['id', 'createdAt', 'updatedAt']) {
}
exports.CreateSubcategoryDto = CreateSubcategoryDto;
class UpdateSubcategoryDto extends (0, swagger_1.PartialType)(CreateSubcategoryDto) {
}
exports.UpdateSubcategoryDto = UpdateSubcategoryDto;
class SubcategoryFilterDto {
}
exports.SubcategoryFilterDto = SubcategoryFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por nome (contém, case-insensitive)', required: false, example: 'gera' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], SubcategoryFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por categoria', required: false, example: 'uuid-categoria' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubcategoryFilterDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por ativo', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubcategoryFilterDto.prototype, "isActive", void 0);
class SubcategoryListQueryDto extends pagination_dto_1.PaginationDto {
}
exports.SubcategoryListQueryDto = SubcategoryListQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por nome (contém, case-insensitive)', required: false, example: 'gera' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], SubcategoryListQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por categoria', required: false, example: 'uuid-categoria' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubcategoryListQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por ativo', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubcategoryListQueryDto.prototype, "isActive", void 0);
//# sourceMappingURL=subcategory.dto.js.map