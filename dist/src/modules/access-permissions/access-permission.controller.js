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
exports.AccessPermissionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const access_permission_service_1 = require("./access-permission.service");
const access_permission_dto_1 = require("./dto/access-permission.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let AccessPermissionController = class AccessPermissionController {
    constructor(accessPermissionService) {
        this.accessPermissionService = accessPermissionService;
    }
    async create(data) {
        const permission = await this.accessPermissionService.create(data);
        return new response_dto_1.SuccessResponseDto('Access permission created successfully', permission);
    }
    async findAll(pagination, filter) {
        const permissions = await this.accessPermissionService.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Access permissions retrieved successfully', permissions);
    }
    async findOne(id) {
        const permission = await this.accessPermissionService.findOne(id);
        return new response_dto_1.SuccessResponseDto('Access permission retrieved successfully', permission);
    }
    async update(id, data) {
        const permission = await this.accessPermissionService.update(id, data);
        return new response_dto_1.SuccessResponseDto('Access permission updated successfully', permission);
    }
    async remove(id) {
        await this.accessPermissionService.remove(id);
        return new response_dto_1.SuccessResponseDto('Access permission deleted successfully');
    }
};
exports.AccessPermissionController = AccessPermissionController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Criar uma nova permissão de acesso',
        description: 'Cria uma nova permissão de acesso no sistema. Acesso restrito a administradores.',
    }),
    (0, swagger_1.ApiBody)({
        type: access_permission_dto_1.CreateAccessPermissionDto,
        description: 'Dados da permissão a ser criada',
        examples: {
            example1: {
                summary: 'Permissão de Edição de Produto',
                description: 'Permissão para editar produtos',
                value: {
                    name: 'Editar Produto',
                    resource: 'Product',
                    action: 'edit',
                    description: 'Permite editar informações de produtos',
                },
            },
            example2: {
                summary: 'Permissão de Visualização de Usuário',
                description: 'Permissão para visualizar usuários',
                value: {
                    name: 'Visualizar Usuário',
                    resource: 'User',
                    action: 'view',
                    description: 'Permite visualizar detalhes dos usuários',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Permissão criada com sucesso',
        type: response_dto_1.SuccessResponseDto,
        schema: {
            example: {
                success: true,
                message: 'Access permission created successfully',
                data: {
                    id: 'uuid-da-permissao',
                    name: 'Editar Produto',
                    resource: 'Product',
                    action: 'edit',
                    description: 'Permite editar informações de produtos',
                    createdAt: '2024-08-19T19:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Dados inválidos fornecidos' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar permissões' }),
    (0, roles_decorator_1.Roles)('access-permissions.create'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [access_permission_dto_1.CreateAccessPermissionDto]),
    __metadata("design:returntype", Promise)
], AccessPermissionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Listar permissões (paginado)',
        description: 'Retorna uma lista de permissões de acesso com filtros.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, example: 'Editar' }),
    (0, swagger_1.ApiQuery)({ name: 'resource', required: false, type: String, example: 'Product' }),
    (0, swagger_1.ApiQuery)({ name: 'action', required: false, type: String, example: 'edit' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Permissões recuperadas com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para listar permissões' }),
    (0, roles_decorator_1.Roles)('access-permissions.list'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, access_permission_dto_1.AccessPermissionFilterDto]),
    __metadata("design:returntype", Promise)
], AccessPermissionController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Obter uma permissão pelo ID',
        description: 'Retorna detalhes de uma permissão específica pelo seu ID. Acesso restrito a administradores.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID único da permissão (UUID)', example: 'uuid-da-permissao', type: String }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Permissão recuperada com sucesso',
        type: response_dto_1.SuccessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Permissão não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para acessar esta permissão' }),
    (0, roles_decorator_1.Roles)('access-permissions.view'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccessPermissionController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar uma permissão pelo ID',
        description: 'Atualiza informações de uma permissão existente. Acesso restrito a administradores.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da permissão (UUID)', example: 'uuid-da-permissao', type: String }),
    (0, swagger_1.ApiBody)({
        type: access_permission_dto_1.UpdateAccessPermissionDto,
        description: 'Campos a serem atualizados (todos opcionais)',
        examples: {
            example1: { summary: 'Atualizar nome e descrição', value: { name: 'Editar Produto Avançado', description: 'Permissão atualizada para edição avançada de produtos' } },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Permissão atualizada com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Permissão não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Dados inválidos fornecidos' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar permissões' }),
    (0, roles_decorator_1.Roles)('access-permissions.update'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, access_permission_dto_1.UpdateAccessPermissionDto]),
    __metadata("design:returntype", Promise)
], AccessPermissionController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Remover uma permissão pelo ID',
        description: 'Remove uma permissão do sistema. Acesso restrito a administradores.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da permissão (UUID)', example: 'uuid-da-permissao', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Permissão excluída com sucesso', type: response_dto_1.SuccessResponseDto, schema: { example: { success: true, message: 'Access permission deleted successfully', data: null } } }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Permissão não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para excluir permissões' }),
    (0, roles_decorator_1.Roles)('access-permissions.delete'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccessPermissionController.prototype, "remove", null);
exports.AccessPermissionController = AccessPermissionController = __decorate([
    (0, swagger_1.ApiTags)('AccessPermissions'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('access-permissions'),
    __metadata("design:paramtypes", [access_permission_service_1.AccessPermissionService])
], AccessPermissionController);
//# sourceMappingURL=access-permission.controller.js.map