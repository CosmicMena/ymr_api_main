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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    async findAll(paginationDto, filterDto) {
        return this.userService.findAll(paginationDto, filterDto);
    }
    async findActiveUsers(limit = 50) {
        return this.userService.findActiveUsers(limit);
    }
    async getUserStats() {
        return this.userService.getUserStats();
    }
    async findOne(id) {
        return this.userService.findOne(id);
    }
    async update(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    async verifyEmail(id) {
        return this.userService.verifyEmail(id);
    }
    async toggleStatus(id) {
        return this.userService.toggleStatus(id);
    }
    async remove(id) {
        return this.userService.remove(id);
    }
    getExampleUser() {
        return {
            id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            name: 'João Silva Santos',
            email: 'joao.silva@email.com',
            phone: '+244 912 345 678',
            birthDate: '1990-05-15',
            address: 'Rua da Independência, 123, Apt 45',
            city: 'Luanda',
            country: 'Angola',
            company: 'Tech Solutions Angola',
            position: 'Gerente de TI',
            avatarUrl: 'https://exemplo.com/avatars/joao-silva.jpg',
            emailVerified: true,
            isActive: true,
            preferredContactMethod: 'email',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar novo usuário',
        description: 'Cria um novo usuário no sistema com validação de dados e verificações de duplicação',
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.CreateUserDto,
        description: 'Dados do usuário a ser criado',
        examples: {
            usuarioCompleto: {
                summary: 'Usuário Completo',
                value: {
                    name: 'João Silva Santos',
                    email: 'joao.silva@email.com',
                    phone: '+244 912 345 678',
                    birthDate: '1990-05-15',
                    address: 'Rua da Independência, 123, Apt 45',
                    city: 'Luanda',
                    country: 'Angola',
                    company: 'Tech Solutions Angola',
                    position: 'Gerente de TI',
                    avatarUrl: 'https://exemplo.com/avatars/joao-silva.jpg',
                    emailVerified: false,
                    isActive: true,
                    preferredContactMethod: 'email',
                },
            },
            usuarioBasico: {
                summary: 'Usuário Básico',
                value: {
                    name: 'Maria Fernanda',
                    email: 'maria.fernanda@gmail.com',
                    country: 'Angola',
                    emailVerified: false,
                    isActive: true,
                    preferredContactMethod: 'email',
                },
            },
            usuarioEmpresarial: {
                summary: 'Usuário Empresarial',
                value: {
                    name: 'Carlos Eduardo Mendes',
                    email: 'carlos.mendes@empresa.co.ao',
                    phone: '+244 923 456 789',
                    city: 'Benguela',
                    country: 'Angola',
                    company: 'Petróleo & Gás Angola',
                    position: 'Diretor Comercial',
                    emailVerified: true,
                    isActive: true,
                    preferredContactMethod: 'phone',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Usuário criado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
                name: { type: 'string', example: 'João Silva Santos' },
                email: { type: 'string', example: 'joao.silva@email.com' },
                country: { type: 'string', example: 'Angola' },
                isActive: { type: 'boolean', example: true },
                createdAt: { type: 'string', example: '2024-08-24T10:30:00.000Z' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dados inválidos ou campos obrigatórios ausentes',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'E-mail já está em uso por outro usuário',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para criar usuários',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar todos os usuários',
        description: 'Retorna uma lista paginada de usuários com filtros opcionais',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Número da página (padrão: 1)',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Quantidade de itens por página (padrão: 10, máximo: 100)',
        example: 20,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Termo de busca por nome, e-mail ou empresa',
        example: 'joão silva',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'city',
        required: false,
        type: String,
        description: 'Filtrar por cidade',
        example: 'Luanda',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'country',
        required: false,
        type: String,
        description: 'Filtrar por país',
        example: 'Angola',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        required: false,
        type: Boolean,
        description: 'Filtrar por status ativo',
        example: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'emailVerified',
        required: false,
        type: Boolean,
        description: 'Filtrar por e-mail verificado',
        example: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        type: String,
        description: 'Campo para ordenação (name, email, createdAt, lastLogin)',
        example: 'createdAt',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        required: false,
        type: String,
        description: 'Ordem da ordenação (asc, desc)',
        example: 'desc',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lista de usuários retornada com sucesso',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            city: { type: 'string' },
                            country: { type: 'string' },
                            isActive: { type: 'boolean' },
                            emailVerified: { type: 'boolean' },
                            createdAt: { type: 'string' },
                            lastLogin: { type: 'string' },
                        },
                    },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' },
                        totalPages: { type: 'number' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para listar usuários',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, user_dto_1.UserFilterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar usuários ativos',
        description: 'Retorna apenas os usuários com status ativo',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Quantidade de usuários a retornar (padrão: 50)',
        example: 20,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lista de usuários ativos retornada com sucesso',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    city: { type: 'string' },
                    isActive: { type: 'boolean' },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findActiveUsers", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter estatísticas dos usuários',
        description: 'Retorna estatísticas gerais sobre os usuários do sistema',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Estatísticas retornadas com sucesso',
        schema: {
            type: 'object',
            properties: {
                totalUsers: { type: 'number', example: 1250 },
                activeUsers: { type: 'number', example: 1100 },
                verifiedUsers: { type: 'number', example: 850 },
                newUsersThisMonth: { type: 'number', example: 45 },
                usersByCountry: {
                    type: 'object',
                    properties: {
                        Angola: { type: 'number', example: 1000 },
                        Brasil: { type: 'number', example: 200 },
                        Portugal: { type: 'number', example: 50 },
                    },
                },
                usersByCities: {
                    type: 'object',
                    properties: {
                        Luanda: { type: 'number', example: 600 },
                        Benguela: { type: 'number', example: 200 },
                        Huambo: { type: 'number', example: 150 },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter usuário por ID',
        description: 'Retorna um usuário específico pelo seu ID único',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do usuário',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Usuário encontrado com sucesso',
        type: user_dto_1.UserDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Usuário não encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar usuário',
        description: 'Atualiza um usuário existente pelo ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do usuário a ser atualizado',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.UpdateUserDto,
        description: 'Dados parciais do usuário para atualização',
        examples: {
            atualizacaoPerfil: {
                summary: 'Atualização de Perfil',
                value: {
                    name: 'João Silva Santos Junior',
                    phone: '+244 912 345 999',
                    address: 'Rua Nova da Independência, 456',
                    position: 'Diretor de TI',
                },
            },
            atualizacaoContato: {
                summary: 'Atualização de Contato',
                value: {
                    email: 'joao.novo@email.com',
                    phone: '+244 923 456 789',
                    preferredContactMethod: 'phone',
                },
            },
            verificacaoEmail: {
                summary: 'Verificação de E-mail',
                value: {
                    emailVerified: true,
                },
            },
            ativacaoUsuario: {
                summary: 'Ativação/Desativação',
                value: {
                    isActive: false,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Usuário atualizado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                isActive: { type: 'boolean' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Usuário não encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dados inválidos para atualização',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'E-mail já está em uso por outro usuário',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para atualizar usuários',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/verify-email'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verificar e-mail do usuário',
        description: 'Marca o e-mail do usuário como verificado',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do usuário',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'E-mail verificado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                emailVerified: { type: 'boolean', example: true },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Usuário não encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-status'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Alternar status do usuário',
        description: 'Alterna entre ativo e inativo o status do usuário',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do usuário',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Status alterado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                isActive: { type: 'boolean' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Usuário não encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover usuário',
        description: 'Remove permanentemente um usuário do sistema',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'ID único do usuário a ser removido',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Usuário removido com sucesso',
        type: response_dto_1.SuccessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Usuário não encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Usuário não pode ser removido (ex: possui pedidos ativos)',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Usuário não autenticado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Usuário sem permissão para remover usuários',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('example'),
    (0, swagger_1.ApiOperation)({
        summary: 'Exemplo de usuário',
        description: 'Retorna um exemplo de estrutura de usuário para referência',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Retorna um usuário de exemplo',
        type: user_dto_1.UserDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getExampleUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map