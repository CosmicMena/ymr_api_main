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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("./order.service");
const order_dto_1 = require("./dto/order.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async create(createOrderDto) {
        return this.orderService.create(createOrderDto);
    }
    async findAll(paginationDto, filterDto) {
        return this.orderService.findAll(paginationDto, filterDto);
    }
    async findActiveOrders(limit = 50) {
        return this.orderService.findActiveOrders(limit);
    }
    async findRecentOrders(limit = 20) {
        return this.orderService.findUrgentOrders(limit);
    }
    async getOrderStats() {
        return this.orderService.getOrderStats();
    }
    async findOne(id) {
        return this.orderService.findOne(id);
    }
    async update(id, updateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }
    async remove(id) {
        return this.orderService.remove(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'manager', 'user'),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar um novo pedido',
        description: 'Cria um novo pedido no sistema com validação de dados e relacionamentos'
    }),
    (0, swagger_1.ApiBody)({
        type: order_dto_1.CreateOrderDto,
        description: 'Dados do pedido a ser criado',
        examples: {
            pedidoVenda: {
                summary: 'Pedido de Venda',
                value: {
                    userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
                    statusId: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
                    serviceType: 'Venda',
                    totalAmount: 15000.00,
                    currency: 'AOA',
                    notes: 'Entrega preferencialmente no período da manhã',
                    deliveryAddress: 'Rua da Independência, 123, Apt 45, Luanda, Angola',
                    deliveryDate: '2024-09-01'
                }
            },
            pedidoServico: {
                summary: 'Pedido de Serviço',
                value: {
                    userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
                    statusId: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
                    serviceType: 'Serviço',
                    totalAmount: 5000.00,
                    currency: 'AOA',
                    notes: 'Manutenção de equipamento industrial'
                }
            },
            pedidoOrcamento: {
                summary: 'Pedido de Orçamento',
                value: {
                    userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
                    statusId: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
                    serviceType: 'Orçamento',
                    totalAmount: 25000.00,
                    currency: 'AOA',
                    notes: 'Solicitação de orçamento para equipamentos industriais'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Pedido criado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                code: { type: 'string', example: 'ORD-2024-001' },
                userId: { type: 'string' },
                totalAmount: { type: 'number' },
                currency: { type: 'string' },
                createdAt: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dados inválidos ou campos obrigatórios ausentes'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Usuário ou status não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para criar pedidos'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar todos os pedidos',
        description: 'Retorna uma lista paginada de pedidos com filtros opcionais'
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
        description: 'Termo de busca por código ou notas',
        example: 'ORD-2024'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'userId',
        required: false,
        type: String,
        description: 'Filtrar por ID do usuário',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'statusId',
        required: false,
        type: String,
        description: 'Filtrar por ID do status',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'serviceType',
        required: false,
        type: String,
        description: 'Filtrar por tipo de serviço',
        example: 'Venda'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minAmount',
        required: false,
        type: Number,
        description: 'Valor mínimo do pedido',
        example: 1000.00
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxAmount',
        required: false,
        type: Number,
        description: 'Valor máximo do pedido',
        example: 50000.00
    }),
    (0, swagger_1.ApiQuery)({
        name: 'startDate',
        required: false,
        type: String,
        description: 'Data de início para filtro',
        example: '2024-08-01'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'endDate',
        required: false,
        type: String,
        description: 'Data de fim para filtro',
        example: '2024-08-31'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        type: String,
        description: 'Campo para ordenação',
        example: 'createdAt'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        required: false,
        type: String,
        description: 'Ordem da ordenação (asc, desc)',
        example: 'desc'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lista de pedidos retornada com sucesso',
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
                            totalAmount: { type: 'number' },
                            currency: { type: 'string' },
                            serviceType: { type: 'string' },
                            createdAt: { type: 'string' }
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
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para listar pedidos'
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        order_dto_1.OrderFilterDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar pedidos ativos',
        description: 'Retorna uma lista dos pedidos mais recentes'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Quantidade de pedidos a retornar (padrão: 50)',
        example: 20
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lista de pedidos ativos retornada com sucesso',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    code: { type: 'string' },
                    totalAmount: { type: 'number' },
                    serviceType: { type: 'string' },
                    createdAt: { type: 'string' }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para listar pedidos'
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findActiveOrders", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar pedidos recentes',
        description: 'Retorna uma lista dos pedidos mais recentes'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Quantidade de pedidos a retornar (padrão: 20)',
        example: 10
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lista de pedidos recentes retornada com sucesso',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    code: { type: 'string' },
                    totalAmount: { type: 'number' },
                    serviceType: { type: 'string' },
                    createdAt: { type: 'string' }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para listar pedidos'
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findRecentOrders", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter estatísticas dos pedidos',
        description: 'Retorna estatísticas gerais sobre os pedidos do sistema'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Estatísticas retornadas com sucesso',
        schema: {
            type: 'object',
            properties: {
                totalOrders: { type: 'number', example: 1250 },
                ordersThisMonth: { type: 'number', example: 45 },
                totalRevenue: { type: 'number', example: 1500000.00 },
                averageOrderValue: { type: 'number', example: 1200.00 }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para acessar estatísticas'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter pedido por ID',
        description: 'Retorna um pedido específico pelo seu ID único com todos os detalhes'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do pedido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Pedido encontrado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                code: { type: 'string' },
                totalAmount: { type: 'number' },
                currency: { type: 'string' },
                serviceType: { type: 'string' },
                createdAt: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Pedido não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar pedido',
        description: 'Atualiza um pedido existente pelo ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do pedido a ser atualizado',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    }),
    (0, swagger_1.ApiBody)({
        type: order_dto_1.UpdateOrderDto,
        description: 'Dados parciais do pedido para atualização',
        examples: {
            atualizacaoStatus: {
                summary: 'Atualização de Status',
                value: {
                    statusId: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
                    notes: 'Pedido em processamento'
                }
            },
            atualizacaoValor: {
                summary: 'Atualização de Valor',
                value: {
                    totalAmount: 18000.00,
                    notes: 'Valor atualizado com taxas adicionais'
                }
            },
            atualizacaoEntrega: {
                summary: 'Atualização de Entrega',
                value: {
                    deliveryDate: '2024-09-05',
                    deliveryAddress: 'Nova Rua da Independência, 456, Luanda'
                }
            },
            atualizacaoNotas: {
                summary: 'Atualização de Notas',
                value: {
                    notes: 'Cliente solicitou alteração na data de entrega'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Pedido atualizado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                code: { type: 'string' },
                totalAmount: { type: 'number' },
                updatedAt: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Pedido não encontrado'
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
        description: 'Usuário sem permissão para atualizar pedidos'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover pedido',
        description: 'Remove permanentemente um pedido do sistema'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do pedido a ser removido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Pedido removido com sucesso',
        type: response_dto_1.SuccessResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Pedido não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Pedido não pode ser removido (ex: possui itens)'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para remover pedidos'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "remove", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map