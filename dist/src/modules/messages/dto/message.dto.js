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
exports.MessageFilterDto = exports.UpdateMessageDto = exports.CreateMessageDto = exports.MessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MessageDto {
}
exports.MessageDto = MessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da mensagem', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do tópico', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageDto.prototype, "threadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de remetente', example: 'user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageDto.prototype, "senderType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do remetente', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageDto.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Conteúdo da mensagem' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Anexos (JSON)', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], MessageDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mensagem lida?', example: false, default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MessageDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageDto.prototype, "createdAt", void 0);
class CreateMessageDto extends (0, swagger_1.OmitType)(MessageDto, ['id', 'createdAt']) {
}
exports.CreateMessageDto = CreateMessageDto;
class UpdateMessageDto extends (0, swagger_1.PartialType)(CreateMessageDto) {
}
exports.UpdateMessageDto = UpdateMessageDto;
class MessageFilterDto {
}
exports.MessageFilterDto = MessageFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por tópico', required: false, example: 'uuid-thread' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageFilterDto.prototype, "threadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por remetente', required: false, example: 'uuid-user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MessageFilterDto.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Apenas não lidas', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MessageFilterDto.prototype, "isUnread", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MessageFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MessageFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=message.dto.js.map