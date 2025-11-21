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
exports.NewsletterSubscriptionFilterDto = exports.UpdateNewsletterSubscriptionDto = exports.CreateNewsletterSubscriptionDto = exports.NewsletterSubscriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NewsletterSubscriptionDto {
}
exports.NewsletterSubscriptionDto = NewsletterSubscriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da inscrição', example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NewsletterSubscriptionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'E-mail', example: 'usuario@email.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], NewsletterSubscriptionDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome', example: 'João', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewsletterSubscriptionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Inscrição ativa?', example: true, default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NewsletterSubscriptionDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Interesses', example: ['produtos', 'novidades'] }),
    __metadata("design:type", Array)
], NewsletterSubscriptionDto.prototype, "interests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de inscrição', example: '2024-08-19T19:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewsletterSubscriptionDto.prototype, "subscribedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de cancelamento', example: '2024-09-01T19:00:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewsletterSubscriptionDto.prototype, "unsubscribedAt", void 0);
class CreateNewsletterSubscriptionDto extends (0, swagger_1.OmitType)(NewsletterSubscriptionDto, ['id', 'subscribedAt', 'unsubscribedAt']) {
}
exports.CreateNewsletterSubscriptionDto = CreateNewsletterSubscriptionDto;
class UpdateNewsletterSubscriptionDto extends (0, swagger_1.PartialType)(CreateNewsletterSubscriptionDto) {
}
exports.UpdateNewsletterSubscriptionDto = UpdateNewsletterSubscriptionDto;
class NewsletterSubscriptionFilterDto {
}
exports.NewsletterSubscriptionFilterDto = NewsletterSubscriptionFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buscar por e-mail (contém)', required: false, example: 'gmail.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewsletterSubscriptionFilterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por ativo', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NewsletterSubscriptionFilterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filtrar por interesse', required: false, example: 'novidades' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewsletterSubscriptionFilterDto.prototype, "interest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data início (subscribedAt >=)', required: false, example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], NewsletterSubscriptionFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data fim (subscribedAt <=)', required: false, example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], NewsletterSubscriptionFilterDto.prototype, "endDate", void 0);
//# sourceMappingURL=newsletter-subscription.dto.js.map