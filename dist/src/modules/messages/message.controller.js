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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const message_dto_1 = require("./dto/message.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let MessageController = class MessageController {
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        const created = await this.service.create(data);
        return new response_dto_1.SuccessResponseDto('Message created successfully', created);
    }
    async findAll(pagination, filter) {
        const result = await this.service.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Messages retrieved successfully', result);
    }
    async findOne(id) {
        const entity = await this.service.findOne(id);
        return new response_dto_1.SuccessResponseDto('Message retrieved successfully', entity);
    }
    async update(id, data) {
        const updated = await this.service.update(id, data);
        return new response_dto_1.SuccessResponseDto('Message updated successfully', updated);
    }
    async remove(id) {
        await this.service.remove(id);
        return new response_dto_1.SuccessResponseDto('Message deleted successfully');
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('messages.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova mensagem', description: 'Cria uma mensagem em um tópico de mensagens.' }),
    (0, swagger_1.ApiBody)({
        type: message_dto_1.MessageDto,
        description: 'Dados da mensagem (exceto id, createdAt)',
        examples: {
            exemplo1: {
                summary: 'Mensagem de usuário',
                value: { threadId: 'uuid-thread', senderType: 'user', senderId: 'uuid-user', content: 'Olá, gostaria de um orçamento...', isRead: false }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Mensagem criada com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar mensagens' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar mensagens (paginado)', description: 'Retorna mensagens com filtros por tópico, remetente, não lidas e período.' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'threadId', required: false, type: String, example: 'uuid-thread' }),
    (0, swagger_1.ApiQuery)({ name: 'senderId', required: false, type: String, example: 'uuid-user' }),
    (0, swagger_1.ApiQuery)({ name: 'isUnread', required: false, type: Boolean, example: true }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Mensagens retornadas com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, message_dto_1.MessageFilterDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter uma mensagem pelo ID', description: 'Retorna detalhes de uma mensagem pelo ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da mensagem (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Mensagem encontrada', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Mensagem não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('messages.update'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar uma mensagem pelo ID', description: 'Atualiza conteúdo ou status de leitura.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da mensagem (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiBody)({
        type: message_dto_1.MessageDto,
        description: 'Campos parciais para atualização',
        examples: {
            marcarLida: { summary: 'Marcar como lida', value: { isRead: true } },
            editarConteudo: { summary: 'Editar conteúdo', value: { content: 'Conteúdo atualizado' } }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Mensagem atualizada com sucesso', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Mensagem não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar mensagens' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('messages.delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover uma mensagem pelo ID', description: 'Remove uma mensagem pelo seu ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da mensagem (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Mensagem removida com sucesso', type: response_dto_1.SuccessResponseDto, schema: { example: { success: true, message: 'Message deleted successfully', data: null } } }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Mensagem não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover mensagens' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "remove", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)('Messages'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map