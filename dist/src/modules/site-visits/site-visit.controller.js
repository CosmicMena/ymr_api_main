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
exports.SiteVisitController = void 0;
const common_1 = require("@nestjs/common");
const site_visit_service_1 = require("./site-visit.service");
const site_visit_dto_1 = require("./dto/site-visit.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let SiteVisitController = class SiteVisitController {
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        const created = await this.service.create(data);
        return new response_dto_1.SuccessResponseDto('Site visit created successfully', created);
    }
    async findAll(pagination, filter) {
        const result = await this.service.findAll(pagination, filter);
        return new response_dto_1.SuccessResponseDto('Site visits retrieved successfully', result);
    }
    async findOne(id) {
        const data = await this.service.findOne(id);
        return new response_dto_1.SuccessResponseDto('Site visit retrieved successfully', data);
    }
    async remove(id) {
        await this.service.remove(id);
        return new response_dto_1.SuccessResponseDto('Site visit deleted successfully');
    }
};
exports.SiteVisitController = SiteVisitController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar nova visita ao site' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Visita registrada', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteVisitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar visitas (paginado)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, type: String, example: 'uuid-user' }),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: false, type: String, example: 'sess-123' }),
    (0, swagger_1.ApiQuery)({ name: 'ipAddress', required: false, type: String, example: '192.168.0.' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, example: '2024-08-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, example: '2024-08-31' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Visitas retornadas com sucesso', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, site_visit_dto_1.SiteVisitFilterDto]),
    __metadata("design:returntype", Promise)
], SiteVisitController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter visita específica' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Visita encontrada', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteVisitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover visita' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Visita removida', type: response_dto_1.SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteVisitController.prototype, "remove", null);
exports.SiteVisitController = SiteVisitController = __decorate([
    (0, swagger_1.ApiTags)('SiteVisits'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('site-visits'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    __metadata("design:paramtypes", [site_visit_service_1.SiteVisitService])
], SiteVisitController);
//# sourceMappingURL=site-visit.controller.js.map