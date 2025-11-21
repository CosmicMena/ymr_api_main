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
exports.QuoteRequestController = void 0;
const common_1 = require("@nestjs/common");
const quote_request_service_1 = require("./quote-request.service");
const quote_request_dto_1 = require("./dto/quote-request.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let QuoteRequestController = class QuoteRequestController {
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        const created = await this.service.create(data);
        return new response_dto_1.SuccessResponseDto('Quote request created successfully', created);
    }
    async findAll(pagination, filter) {
        const result = await this.service.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Quote requests retrieved successfully', result);
    }
    async findOne(id) {
        const entity = await this.service.findOne(id);
        return new response_dto_1.SuccessResponseDto('Quote request retrieved successfully', entity);
    }
    async update(id, data) {
        const updated = await this.service.update(id, data);
        return new response_dto_1.SuccessResponseDto('Quote request updated successfully', updated);
    }
    async remove(id) {
        await this.service.remove(id);
        return new response_dto_1.SuccessResponseDto('Quote request deleted successfully');
    }
};
exports.QuoteRequestController = QuoteRequestController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('quoteRequests.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova solicitação de orçamento', description: 'Cria uma nova solicitação de orçamento vinculada ao usuário e status.' }),
    (0, swagger_1.ApiBody)({
        type: quote_request_dto_1.QuoteRequestDto,
        description: 'Dados da solicitação (exceto id, createdAt, updatedAt)',
        examples: {
            exemplo1: {
                summary: 'Solicitação padrão',
                value: {
                    code: 'Q-2024-001',
                    userId: 'uuid-do-usuario',
                    statusId: 'uuid-do-status',
                    totalItems: 3,
                    notes: 'Preciso de orçamento de 3 geradores 50kVA'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Solicitação criada com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar solicitações' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar solicitações (paginado)', description: 'Retorna solicitações com filtros por usuário, status e data.' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, example: 'Q-2024' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, type: String, example: 'uuid-user' }),
    (0, swagger_1.ApiQuery)({ name: 'statusId', required: false, type: String, example: 'uuid-status' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Lista retornada com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, quote_request_dto_1.QuoteRequestFilterDto]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter solicitação de orçamento pelo ID', description: 'Retorna os detalhes de uma solicitação de orçamento pelo ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da solicitação (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Solicitação encontrada', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Solicitação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('quoteRequests.update'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar solicitação de orçamento pelo ID', description: 'Atualiza dados de uma solicitação existente.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da solicitação (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiBody)({
        type: quote_request_dto_1.QuoteRequestDto,
        description: 'Campos parciais para atualização',
        examples: {
            atualizarStatus: { summary: 'Atualizar status', value: { statusId: 'uuid-novo-status' } },
            atualizarNotas: { summary: 'Atualizar notas', value: { adminNotes: 'Cliente retornará amanhã' } },
            atualizarItens: { summary: 'Atualizar total de itens', value: { totalItems: 5 } }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Solicitação atualizada com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Solicitação não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar solicitações' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('quoteRequests.delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover solicitação de orçamento pelo ID', description: 'Remove uma solicitação do sistema.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da solicitação (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Solicitação removida com sucesso', type: response_dto_1.SuccessResponseDto, schema: { example: { success: true, message: 'Quote request deleted successfully', data: null } } }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Solicitação não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover solicitações' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "remove", null);
exports.QuoteRequestController = QuoteRequestController = __decorate([
    (0, swagger_1.ApiTags)('QuoteRequests'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('quote-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [quote_request_service_1.QuoteRequestService])
], QuoteRequestController);
//# sourceMappingURL=quote-request.controller.js.map