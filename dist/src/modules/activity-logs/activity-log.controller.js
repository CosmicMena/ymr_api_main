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
exports.ActivityLogController = void 0;
const common_1 = require("@nestjs/common");
const activity_log_service_1 = require("./activity-log.service");
const activity_log_dto_1 = require("./dto/activity-log.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let ActivityLogController = class ActivityLogController {
    constructor(activityLogService) {
        this.activityLogService = activityLogService;
    }
    async create(data) {
        const created = await this.activityLogService.create(data);
        return new response_dto_1.SuccessResponseDto('Activity log created successfully', created);
    }
    async findAll(pagination, filter) {
        const result = await this.activityLogService.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Activity logs retrieved successfully', result);
    }
    async findOne(id) {
        const data = await this.activityLogService.findOne(id);
        return new response_dto_1.SuccessResponseDto('Activity log retrieved successfully', data);
    }
    async update(id, data) {
        const updated = await this.activityLogService.update(id, data);
        return new response_dto_1.SuccessResponseDto('Activity log updated successfully', updated);
    }
    async remove(id) {
        await this.activityLogService.remove(id);
        return new response_dto_1.SuccessResponseDto('Activity log deleted successfully');
    }
};
exports.ActivityLogController = ActivityLogController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo log de atividade' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Log criado com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityLogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar logs de atividade (paginado)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, type: String, example: 'uuid-user' }),
    (0, swagger_1.ApiQuery)({ name: 'adminId', required: false, type: String, example: 'uuid-admin' }),
    (0, swagger_1.ApiQuery)({ name: 'action', required: false, type: String, example: 'login' }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', required: false, type: String, example: 'User' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Logs retornados com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, activity_log_dto_1.ActivityLogFilterDto]),
    __metadata("design:returntype", Promise)
], ActivityLogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter um log pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Log encontrado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityLogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um log pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Log atualizado', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ActivityLogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover um log pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Log removido', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityLogController.prototype, "remove", null);
exports.ActivityLogController = ActivityLogController = __decorate([
    (0, swagger_1.ApiTags)('ActivityLogs'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('activity-logs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [activity_log_service_1.ActivityLogService])
], ActivityLogController);
//# sourceMappingURL=activity-log.controller.js.map