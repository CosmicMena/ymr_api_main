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
exports.SubcategoryController = void 0;
const common_1 = require("@nestjs/common");
const subcategory_service_1 = require("./subcategory.service");
const subcategory_dto_1 = require("./dto/subcategory.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
let SubcategoryController = class SubcategoryController {
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        const created = await this.service.create(data);
        return new response_dto_1.SuccessResponseDto('Subcategory created successfully', created);
    }
    async findAll(query) {
        const { page, limit, search, isActive, categoryId } = query;
        const result = await this.service.findAll({ page, limit, search }, { isActive, categoryId, search });
        return new response_dto_1.SuccessResponseDto('Subcategories retrieved successfully', result);
    }
    async findOne(id) {
        const entity = await this.service.findOne(id);
        return new response_dto_1.SuccessResponseDto('Subcategory retrieved successfully', entity);
    }
    async update(id, data) {
        const updated = await this.service.update(id, data);
        return new response_dto_1.SuccessResponseDto('Subcategory updated successfully', updated);
    }
    async remove(id) {
        await this.service.remove(id);
        return new response_dto_1.SuccessResponseDto('Subcategory deleted successfully');
    }
};
exports.SubcategoryController = SubcategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('subcategories.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova subcategoria', description: 'Cria uma nova subcategoria vinculada a uma categoria existente.' }),
    (0, swagger_1.ApiBody)({
        type: subcategory_dto_1.SubcategoryDto,
        description: 'Dados da subcategoria a ser criada (exceto id, createdAt, updatedAt)',
        examples: {
            exemplo1: {
                summary: 'Subcategoria de Geradores',
                value: {
                    name: 'Geradores Industriais',
                    categoryId: 'uuid-da-categoria',
                    isActive: true
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Subcategoria criada com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Dados inválidos fornecidos' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar subcategorias' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar subcategorias (paginado)', description: 'Retorna subcategorias com filtros por nome, categoria e ativo.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Lista retornada com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subcategory_dto_1.SubcategoryListQueryDto]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter subcategoria específica', description: 'Retorna os detalhes de uma subcategoria pelo ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da subcategoria (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Subcategoria encontrada', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Subcategoria não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('subcategories.update'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar subcategoria', description: 'Atualiza dados de uma subcategoria existente.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da subcategoria (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiBody)({
        type: subcategory_dto_1.SubcategoryDto,
        description: 'Campos parciais para atualização',
        examples: {
            atualizarNome: { summary: 'Atualizar nome', value: { name: 'Geradores de Backup' } },
            ativarDesativar: { summary: 'Ativar/Desativar', value: { isActive: false } }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Subcategoria atualizada', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Subcategoria não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar subcategorias' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('subcategories.delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover subcategoria', description: 'Remove uma subcategoria pelo ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da subcategoria (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Subcategoria removida com sucesso', type: response_dto_1.SuccessResponseDto, schema: { example: { success: true, message: 'Subcategory deleted successfully', data: null } } }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Subcategoria não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover subcategorias' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "remove", null);
exports.SubcategoryController = SubcategoryController = __decorate([
    (0, swagger_1.ApiTags)('Subcategories'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('subcategories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [subcategory_service_1.SubcategoryService])
], SubcategoryController);
//# sourceMappingURL=subcategory.controller.js.map