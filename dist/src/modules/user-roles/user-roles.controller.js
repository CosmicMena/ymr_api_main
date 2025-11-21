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
exports.UserRolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_roles_service_1 = require("./user-roles.service");
const user_role_dto_1 = require("./dto/user-role.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let UserRolesController = class UserRolesController {
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        const created = await this.service.create(data);
        return new response_dto_1.SuccessResponseDto('User role created successfully', created);
    }
    async findAll(pagination, filter) {
        const result = await this.service.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('User roles retrieved successfully', result);
    }
    async findOne(id) {
        const data = await this.service.findOne(id);
        return new response_dto_1.SuccessResponseDto('User role retrieved successfully', data);
    }
    async update(id, data) {
        const updated = await this.service.update(id, data);
        return new response_dto_1.SuccessResponseDto('User role updated successfully', updated);
    }
    async remove(id) {
        await this.service.remove(id);
        return new response_dto_1.SuccessResponseDto('User role deleted successfully');
    }
};
exports.UserRolesController = UserRolesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar papel de usuário' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Papel criado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar papéis (paginado)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'name', required: false, type: String, example: 'admin' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean, example: true }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Lista retornada', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, user_role_dto_1.UserRoleFilterDto]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter papel por ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Papel encontrado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar papel de usuário' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Papel atualizado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover papel de usuário' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Papel removido', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "remove", null);
exports.UserRolesController = UserRolesController = __decorate([
    (0, swagger_1.ApiTags)('UserRoles'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('user-roles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_roles_service_1.UserRolesService])
], UserRolesController);
//# sourceMappingURL=user-roles.controller.js.map