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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const brands_service_1 = require("./brands.service");
const brand_dto_1 = require("./dto/brand.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let BrandController = class BrandController {
    constructor(brandService) {
        this.brandService = brandService;
    }
    async create(createBrandDto) {
        const brand = await this.brandService.create(createBrandDto);
        return new response_dto_1.SuccessResponseDto('Brand created successfully', brand);
    }
    async findAll(pagination, filter) {
        const result = await this.brandService.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Brands retrieved successfully', result);
    }
    async findOne(id) {
        const brand = await this.brandService.findOne(id);
        return new response_dto_1.SuccessResponseDto('Brand retrieved successfully', brand);
    }
    async update(id, updateBrandDto) {
        const brand = await this.brandService.update(id, updateBrandDto);
        return new response_dto_1.SuccessResponseDto('Brand updated successfully', brand);
    }
    async remove(id) {
        await this.brandService.remove(id);
        return new response_dto_1.SuccessResponseDto('Brand deleted successfully');
    }
};
exports.BrandController = BrandController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Criar nova marca',
        description: 'Cria uma nova marca de produtos no sistema. Acesso restrito a administradores.'
    }),
    (0, swagger_1.ApiBody)({
        type: brand_dto_1.BrandDto,
        description: 'Dados da marca a ser criada',
        examples: {
            example1: {
                summary: 'Marca Industrial',
                description: 'Exemplo de criação de uma marca industrial',
                value: {
                    name: 'YMR Industrial',
                    description: 'Marca líder em equipamentos industriais de alta qualidade',
                    logoUrl: 'https://example.com/logo-ymr.png',
                    isActive: true
                }
            },
            example2: {
                summary: 'Marca Residencial',
                description: 'Exemplo de criação de uma marca residencial',
                value: {
                    name: 'HomeTech',
                    description: 'Marca especializada em equipamentos residenciais inteligentes',
                    logoUrl: 'https://example.com/logo-hometech.png',
                    isActive: true
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Marca criada com sucesso',
        type: response_dto_1.SuccessResponseDto,
        schema: {
            example: {
                success: true,
                message: 'Brand created successfully',
                data: {
                    id: 'uuid-da-marca',
                    name: 'YMR Industrial',
                    createdAt: '2024-01-15T10:30:00Z'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Nome da marca já existe no sistema'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dados inválidos fornecidos'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para criar marcas'
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token JWT',
        required: true
    }),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    (0, roles_decorator_1.Roles)('brands.create'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Listar marcas (paginado)',
        description: 'Retorna lista paginada de marcas com filtros opcionais.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, example: 'cat' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean, example: true }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Marcas recuperadas com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Erro na requisição' }),
    (0, swagger_1.ApiProduces)('application/json'),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, brand_dto_1.BrandFilterDto]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar marca por ID',
        description: 'Retorna informações detalhadas de uma marca específica pelo seu ID.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID único da marca (UUID)',
        example: 'uuid-da-marca',
        type: String
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Marca recuperada com sucesso',
        type: response_dto_1.SuccessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Marca não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'ID inválido fornecido'
    }),
    (0, swagger_1.ApiProduces)('application/json'),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar marca',
        description: 'Atualiza as informações de uma marca existente. Acesso restrito a administradores.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID único da marca a ser atualizada (UUID)',
        example: 'uuid-da-marca',
        type: String
    }),
    (0, swagger_1.ApiBody)({
        type: brand_dto_1.BrandDto,
        description: 'Dados da marca a serem atualizados (todos os campos são opcionais)',
        examples: {
            example1: {
                summary: 'Atualizar nome e descrição',
                description: 'Exemplo de atualização de nome e descrição',
                value: {
                    name: 'YMR Industrial Solutions',
                    description: 'Marca líder em soluções industriais de alta tecnologia'
                }
            },
            example2: {
                summary: 'Atualizar logo e status',
                description: 'Exemplo de atualização de logo e status',
                value: {
                    logoUrl: 'https://example.com/new-logo-ymr.png',
                    isActive: false
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Marca atualizada com sucesso',
        type: response_dto_1.SuccessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Marca não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dados inválidos fornecidos'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para atualizar marcas'
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token JWT',
        required: true
    }),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    (0, roles_decorator_1.Roles)('brands.update'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Excluir marca',
        description: 'Remove uma marca do sistema. Acesso restrito a administradores.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID único da marca a ser excluída (UUID)',
        example: 'uuid-da-marca',
        type: String
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Marca excluída com sucesso',
        type: response_dto_1.SuccessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Marca não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Não é possível excluir marca com produtos associados'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para excluir marcas'
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token JWT',
        required: true
    }),
    (0, swagger_1.ApiProduces)('application/json'),
    (0, roles_decorator_1.Roles)('brands.delete'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "remove", null);
exports.BrandController = BrandController = __decorate([
    (0, swagger_1.ApiTags)('Brands'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('brands'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [brands_service_1.BrandService])
], BrandController);
//# sourceMappingURL=brands.controller.js.map