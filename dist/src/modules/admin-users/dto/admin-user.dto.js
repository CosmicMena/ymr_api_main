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
exports.AdminUserFilterDto = exports.UpdateAdminUserDto = exports.CreateAdminUserDto = exports.AdminUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AdminUserDto {
}
exports.AdminUserDto = AdminUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do administrador', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do administrador', example: 'Maria Admin' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'E-mail do administrador', example: 'admin@email.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hash da senha', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "passwordHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL do avatar', example: 'https://exemplo.com/avatar.png', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do papel', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Administrador ativo?', example: true, default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUserDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Último login', example: '2024-08-19T19:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "lastLogin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do criador', example: 'uuid', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserDto.prototype, "updatedAt", void 0);
class CreateAdminUserDto extends (0, swagger_1.OmitType)(AdminUserDto, ['id', 'passwordHash', 'lastLogin', 'createdAt', 'updatedAt']) {
}
exports.CreateAdminUserDto = CreateAdminUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Senha do administrador (texto plano)', example: 'StrongPass@123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "password", void 0);
class UpdateAdminUserDto extends (0, swagger_1.PartialType)(CreateAdminUserDto) {
}
exports.UpdateAdminUserDto = UpdateAdminUserDto;
class AdminUserFilterDto {
}
exports.AdminUserFilterDto = AdminUserFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por nome/email (contém)', required: false, example: 'maria' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUserFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por papel', required: false, example: 'uuid-role' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AdminUserFilterDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por ativo', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUserFilterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AdminUserFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AdminUserFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=admin-user.dto.js.map