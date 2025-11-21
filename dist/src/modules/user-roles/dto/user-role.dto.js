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
exports.UserRoleFilterDto = exports.UpdateUserRoleDto = exports.CreateUserRoleDto = exports.UserRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserRoleDto {
}
exports.UserRoleDto = UserRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do papel', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserRoleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do papel', example: 'Administrador' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserRoleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição do papel', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserRoleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permissões (JSON)', required: false, example: '{"canEdit":true}' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UserRoleDto.prototype, "permissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Papel ativo?', example: true, default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserRoleDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserRoleDto.prototype, "createdAt", void 0);
class CreateUserRoleDto extends (0, swagger_1.OmitType)(UserRoleDto, ['id', 'createdAt']) {
}
exports.CreateUserRoleDto = CreateUserRoleDto;
class UpdateUserRoleDto extends (0, swagger_1.PartialType)(CreateUserRoleDto) {
}
exports.UpdateUserRoleDto = UpdateUserRoleDto;
class UserRoleFilterDto {
}
exports.UserRoleFilterDto = UserRoleFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por nome (contém)', required: false, example: 'admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserRoleFilterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por ativo', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UserRoleFilterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UserRoleFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UserRoleFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=user-role.dto.js.map