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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./dto/category.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    async findAll(filterDto) {
        if (filterDto.isActive !== undefined) {
            return this.categoryService.findActiveCategories();
        }
        return this.categoryService.findAll();
    }
    async findActiveCategories() {
        return this.categoryService.findActiveCategories();
    }
    async findOne(id) {
        return this.categoryService.findOne(id);
    }
    async update(id, updateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }
    async remove(id) {
        return this.categoryService.remove(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar uma nova categoria',
        description: 'Cria uma nova categoria no sistema com validação de dados'
    }),
    (0, swagger_1.ApiBody)({
        type: category_dto_1.CreateCategoryDto,
        description: 'Dados da categoria a ser criada',
        examples: {
            categoriaEletronicos: {
                summary: 'Categoria Eletrônicos',
                value: {
                    name: 'Eletrônicos',
                    description: 'Produtos eletrônicos e tecnológicos de última geração',
                    imageUrl: 'https://exemplo.com/images/eletronicos.jpg',
                    isActive: true
                }
            },
            categoriaVestuario: {
                summary: 'Categoria Vestuário',
                value: {
                    name: 'Vestuário',
                    description: 'Roupas, calçados e acessórios para todas as idades',
                    imageUrl: 'https://exemplo.com/images/vestuario.jpg',
                    isActive: true
                }
            },
            categoriaCasa: {
                summary: 'Categoria Casa e Jardim',
                value: {
                    name: 'Casa e Jardim',
                    description: 'Produtos para decoração, organização e jardinagem',
                    isActive: true
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Categoria criada com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                imageUrl: { type: 'string' },
                isActive: { type: 'boolean' },
                createdAt: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dados inválidos ou campos obrigatórios ausentes'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Nome da categoria já existe'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para criar categorias'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar todas as categorias',
        description: 'Retorna uma lista de todas as categorias do sistema'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        required: false,
        type: Boolean,
        description: 'Filtrar por status ativo',
        example: true
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Termo de busca por nome ou descrição',
        example: 'eletrônicos'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lista de categorias retornada com sucesso',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    imageUrl: { type: 'string' },
                    isActive: { type: 'boolean' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryFilterDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar categorias ativas',
        description: 'Retorna apenas as categorias ativas ordenadas por nome'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Categorias ativas retornadas com sucesso',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    imageUrl: { type: 'string' },
                    isActive: { type: 'boolean' }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findActiveCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter categoria por ID',
        description: 'Retorna uma categoria específica pelo seu ID único'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único da categoria',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Categoria encontrada com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                imageUrl: { type: 'string' },
                isActive: { type: 'boolean' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Categoria não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar categoria',
        description: 'Atualiza uma categoria existente pelo ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único da categoria a ser atualizada',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    }),
    (0, swagger_1.ApiBody)({
        type: category_dto_1.UpdateCategoryDto,
        description: 'Dados parciais da categoria para atualização',
        examples: {
            atualizacaoNome: {
                summary: 'Atualização de Nome',
                value: {
                    name: 'Eletrônicos Avançados',
                    description: 'Produtos eletrônicos de última geração e inovação'
                }
            },
            atualizacaoImagem: {
                summary: 'Atualização de Imagem',
                value: {
                    imageUrl: 'https://exemplo.com/images/nova-categoria.jpg'
                }
            },
            ativacaoCategoria: {
                summary: 'Ativação/Desativação',
                value: {
                    isActive: false
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Categoria atualizada com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                imageUrl: { type: 'string' },
                isActive: { type: 'boolean' },
                updatedAt: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Categoria não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dados inválidos para atualização'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para atualizar categorias'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover categoria',
        description: 'Remove permanentemente uma categoria do sistema'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único da categoria a ser removida',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Categoria removida com sucesso',
        type: response_dto_1.SuccessResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Categoria não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Categoria não pode ser removida (ex: possui produtos vinculados)'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para remover categorias'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map