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
exports.RolePermissionFilterDto = exports.UpdateRolePermissionDto = exports.CreateRolePermissionDto = exports.RolePermissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RolePermissionDto {
}
exports.RolePermissionDto = RolePermissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do papel', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RolePermissionDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da permissão', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RolePermissionDto.prototype, "permissionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de concessão', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RolePermissionDto.prototype, "grantedAt", void 0);
class CreateRolePermissionDto extends (0, swagger_1.OmitType)(RolePermissionDto, ['grantedAt']) {
}
exports.CreateRolePermissionDto = CreateRolePermissionDto;
class UpdateRolePermissionDto extends (0, swagger_1.PartialType)(CreateRolePermissionDto) {
}
exports.UpdateRolePermissionDto = UpdateRolePermissionDto;
class RolePermissionFilterDto {
}
exports.RolePermissionFilterDto = RolePermissionFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por papel', required: false, example: 'uuid-role' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RolePermissionFilterDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por permissão', required: false, example: 'uuid-permission' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RolePermissionFilterDto.prototype, "permissionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (grantedAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RolePermissionFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (grantedAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RolePermissionFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=role-permission.dto.js.map