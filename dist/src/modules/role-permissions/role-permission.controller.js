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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionController = void 0;
const common_1 = require("@nestjs/common");
const role_permission_service_1 = require("./role-permission.service");
const role_permission_dto_1 = require("./dto/role-permission.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let RolePermissionController = class RolePermissionController {
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        const created = await this.service.create(data);
        return new response_dto_1.SuccessResponseDto('Role permission created successfully', created);
    }
    async findAll(pagination, filter) {
        const result = await this.service.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Role permissions retrieved successfully', result);
    }
    async findOne(roleId, permissionId) {
        const data = await this.service.findOne(roleId, permissionId);
        return new response_dto_1.SuccessResponseDto('Role permission retrieved successfully', data);
    }
    async remove(roleId, permissionId) {
        await this.service.remove(roleId, permissionId);
        return new response_dto_1.SuccessResponseDto('Role permission deleted successfully');
    }
};
exports.RolePermissionController = RolePermissionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Conceder permissão a um papel' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Concedida com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar permissões de papéis (paginado)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'roleId', required: false, type: String, example: 'uuid-role' }),
    (0, swagger_1.ApiQuery)({ name: 'permissionId', required: false, type: String, example: 'uuid-permission' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Lista retornada', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, role_permission_dto_1.RolePermissionFilterDto]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':roleId/:permissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter permissão específica de um papel' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Registro encontrado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('roleId')),
    __param(1, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':roleId/:permissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Revogar permissão de um papel' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Registro removido', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('roleId')),
    __param(1, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "remove", null);
exports.RolePermissionController = RolePermissionController = __decorate([
    (0, swagger_1.ApiTags)('RolePermissions'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('role-permissions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [role_permission_service_1.RolePermissionService])
], RolePermissionController);
//# sourceMappingURL=role-permission.controller.js.map