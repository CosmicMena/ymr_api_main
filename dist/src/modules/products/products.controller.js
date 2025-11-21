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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const product_dto_1 = require("./dto/product.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    async findAll(query) {
        const { page, limit, search, sortBy, sortOrder, ...filters } = query;
        return this.productsService.findAll({ page, limit, search, sortBy, sortOrder }, filters);
    }
    async getPopularProducts(limit = 10) {
        return this.productsService.getPopularProducts(limit);
    }
    async getFeaturedProducts(limit = 10) {
        return this.productsService.getFeaturedProducts(limit);
    }
    async findOne(id) {
        return this.productsService.findOne(id);
    }
    async update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    async remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar um novo produto',
        description: 'Cria um novo produto no sistema com validação de dados e relacionamentos'
    }),
    (0, swagger_1.ApiBody)({
        type: product_dto_1.CreateProductDto,
        description: 'Dados do produto a ser criado',
        examples: {
            produtoEletronico: {
                summary: 'Produto Eletrônico',
                value: {
                    code: 'SAMS-GS23-128GB',
                    name: 'Smartphone Samsung Galaxy S23',
                    model: 'Galaxy S23',
                    description: 'Smartphone de última geração com câmera de 108MP',
                    price: 2999.99,
                    brandId: 'uuid-da-marca-samsung',
                    subcategoryId: 'uuid-da-subcategoria-smartphones',
                    stockQuantity: 50,
                    isActive: true,
                    features: ['5G', 'Câmera 108MP', 'Processador Snapdragon'],
                    specifications: {
                        screen: '6.1" Dynamic AMOLED 2X',
                        processor: 'Snapdragon 8 Gen 2',
                        ram: '8GB',
                        storage: '128GB',
                        battery: '3900mAh'
                    }
                }
            },
            produtoVestuario: {
                summary: 'Produto de Vestuário',
                value: {
                    code: 'VEST-CAM-ALG-M',
                    name: 'Camiseta Básica Algodão',
                    description: 'Camiseta 100% algodão orgânico, confortável e durável',
                    price: 29.99,
                    brandId: 'uuid-da-marca-vestuario',
                    subcategoryId: 'uuid-da-subcategoria-camisetas',
                    stockQuantity: 200,
                    isActive: true,
                    features: ['100% Algodão', 'Orgânico', 'Confortável'],
                    specifications: {
                        material: '100% Algodão Orgânico',
                        tamanho: 'M',
                        cor: 'Branco',
                        lavagem: 'Lavar a 30°C'
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Produto criado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                code: { type: 'string' },
                name: { type: 'string' },
                price: { type: 'number' },
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
        description: 'Código do produto já existe'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para criar produtos'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar todos os produtos',
        description: 'Retorna uma lista paginada de produtos com filtros opcionais'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Número da página (padrão: 1)',
        example: 1
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Quantidade de itens por página (padrão: 10, máximo: 100)',
        example: 20
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Termo de busca por nome, código, descrição ou modelo',
        example: 'smartphone'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'categoryId',
        required: false,
        type: String,
        description: 'Filtrar por categoria',
        example: 'uuid-da-categoria'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'brandId',
        required: false,
        type: String,
        description: 'Filtrar por marca',
        example: 'uuid-da-marca'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minPrice',
        required: false,
        type: Number,
        description: 'Preço mínimo',
        example: 100
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxPrice',
        required: false,
        type: Number,
        description: 'Preço máximo',
        example: 5000
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        required: false,
        type: Boolean,
        description: 'Filtrar por status ativo',
        example: true
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        type: String,
        description: 'Campo para ordenação (name, price, createdAt, updatedAt)',
        example: 'price'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        required: false,
        type: String,
        description: 'Ordem da ordenação (asc, desc)',
        example: 'asc'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lista de produtos retornada com sucesso',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            code: { type: 'string' },
                            name: { type: 'string' },
                            price: { type: 'number' },
                            isActive: { type: 'boolean' }
                        }
                    }
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' },
                        totalPages: { type: 'number' }
                    }
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
    __metadata("design:paramtypes", [product_dto_1.ProductListQueryDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('popular'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter produtos populares',
        description: 'Retorna os produtos mais visualizados/populares'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Quantidade de produtos a retornar (padrão: 10)',
        example: 5
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Produtos populares retornados com sucesso',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    code: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    viewCount: { type: 'number' }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getPopularProducts", null);
__decorate([
    (0, common_1.Get)('featured'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter produtos em destaque',
        description: 'Retorna produtos marcados como em destaque'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Quantidade de produtos a retornar (padrão: 10)',
        example: 8
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Produtos em destaque retornados com sucesso',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    code: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    isActive: { type: 'boolean' }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getFeaturedProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter produto por ID',
        description: 'Retorna um produto específico pelo seu ID único'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do produto',
        example: 'uuid-do-produto'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Produto encontrado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                code: { type: 'string' },
                name: { type: 'string' },
                price: { type: 'number' },
                isActive: { type: 'boolean' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Produto não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar produto',
        description: 'Atualiza um produto existente pelo ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do produto a ser atualizado',
        example: 'uuid-do-produto'
    }),
    (0, swagger_1.ApiBody)({
        type: product_dto_1.UpdateProductDto,
        description: 'Dados parciais do produto para atualização',
        examples: {
            atualizacaoPreco: {
                summary: 'Atualização de Preço',
                value: {
                    price: 2799.99,
                    stockQuantity: 45
                }
            },
            atualizacaoDescricao: {
                summary: 'Atualização de Descrição',
                value: {
                    description: 'Smartphone Samsung Galaxy S23 com câmera aprimorada e nova cor',
                    specifications: {
                        screen: '6.1" Dynamic AMOLED 2X 120Hz',
                        processor: 'Snapdragon 8 Gen 2',
                        ram: '8GB LPDDR5X',
                        storage: '128GB UFS 4.0',
                        battery: '3900mAh com carregamento de 25W'
                    }
                }
            },
            ativacaoProduto: {
                summary: 'Ativação/Desativação',
                value: {
                    isActive: false
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Produto atualizado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                code: { type: 'string' },
                name: { type: 'string' },
                price: { type: 'number' },
                updatedAt: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Produto não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dados inválidos para atualização'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Código do produto já existe'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para atualizar produtos'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover produto',
        description: 'Remove permanentemente um produto do sistema'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do produto a ser removido',
        example: 'uuid-do-produto'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Produto removido com sucesso',
        type: response_dto_1.SuccessResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Produto não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Produto não pode ser removido (ex: possui pedidos ativos)'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para remover produtos'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('products'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map