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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageThreadFilterDto = exports.UpdateMessageThreadDto = exports.CreateMessageThreadDto = exports.MessageThreadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MessageThreadDto {
}
exports.MessageThreadDto = MessageThreadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do tópico de mensagem', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageThreadDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assunto', example: 'Dúvida sobre produto' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], MessageThreadDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do usuário', example: 'uuid', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageThreadDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do admin', example: 'uuid', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageThreadDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status do tópico', example: 'open', default: 'open', enum: ['open', 'closed', 'pending'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['open', 'closed', 'pending']),
    __metadata("design:type", String)
], MessageThreadDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prioridade', example: 'normal', default: 'normal', enum: ['low', 'normal', 'high'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['low', 'normal', 'high']),
    __metadata("design:type", String)
], MessageThreadDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageThreadDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageThreadDto.prototype, "updatedAt", void 0);
class CreateMessageThreadDto extends (0, swagger_1.OmitType)(MessageThreadDto, ['id', 'createdAt', 'updatedAt']) {
}
exports.CreateMessageThreadDto = CreateMessageThreadDto;
class UpdateMessageThreadDto extends (0, swagger_1.PartialType)(CreateMessageThreadDto) {
}
exports.UpdateMessageThreadDto = UpdateMessageThreadDto;
class MessageThreadFilterDto {
}
exports.MessageThreadFilterDto = MessageThreadFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por assunto (contém)', required: false, example: 'produto' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], MessageThreadFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por usuário', required: false, example: 'uuid-user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageThreadFilterDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por admin', required: false, example: 'uuid-admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageThreadFilterDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por status', required: false, example: 'open', enum: ['open', 'closed', 'pending'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['open', 'closed', 'pending']),
    __metadata("design:type", String)
], MessageThreadFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por prioridade', required: false, example: 'high', enum: ['low', 'normal', 'high'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['low', 'normal', 'high']),
    __metadata("design:type", String)
], MessageThreadFilterDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MessageThreadFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MessageThreadFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=message-thread.dto.js.map