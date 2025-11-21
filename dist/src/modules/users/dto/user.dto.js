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
exports.UserFilterDto = exports.UpdateUserDto = exports.CreateUserDto = exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID único do usuário',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do usuário',
        example: 'João Silva Santos',
        maxLength: 150,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'joao.silva@email.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Telefone do usuário',
        example: '+244 912 345 678',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de nascimento',
        example: '1990-01-01',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UserDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Endereço completo',
        example: 'Rua da Independência, 123, Apt 45',
        required: false,
        maxLength: 300,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], UserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cidade',
        example: 'Luanda',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'País',
        example: 'Angola',
        default: 'Angola',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da empresa',
        example: 'Tech Solutions Angola',
        required: false,
        maxLength: 150,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], UserDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cargo ou posição',
        example: 'Gerente de TI',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UserDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do avatar do usuário',
        example: 'https://exemplo.com/avatars/joao-silva.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UserDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hash da senha (uso interno)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "passwordHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do Google para login social',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "googleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se o e-mail foi verificado',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserDto.prototype, "emailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status de ativação do usuário',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Método de contato preferido',
        example: 'email',
        enum: ['email', 'phone', 'whatsapp'],
        default: 'email',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['email', 'phone', 'whatsapp']),
    __metadata("design:type", String)
], UserDto.prototype, "preferredContactMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de criação do usuário',
        example: '2024-08-24T10:30:00.000Z',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data da última atualização',
        example: '2024-08-24T11:15:00.000Z',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data do último login',
        example: '2024-08-24T09:45:00.000Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "lastLogin", void 0);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do usuário',
        example: 'João Silva Santos',
        maxLength: 150,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'joao.silva@email.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Telefone do usuário',
        example: '+244 912 345 678',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de nascimento',
        example: '1990-05-15',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Endereço completo',
        example: 'Rua da Independência, 123, Apt 45',
        required: false,
        maxLength: 300,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cidade',
        example: 'Luanda',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'País',
        example: 'Angola',
        default: 'Angola',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da empresa',
        example: 'Tech Solutions Angola',
        required: false,
        maxLength: 150,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateUserDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cargo ou posição',
        example: 'Gerente de TI',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do avatar do usuário',
        example: 'https://exemplo.com/avatars/joao-silva.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateUserDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hash da senha',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "passwordHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do Google para login social',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "googleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se o e-mail foi verificado',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "emailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status de ativação do usuário',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Método de contato preferido',
        example: 'email',
        enum: ['email', 'phone', 'whatsapp'],
        default: 'email',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['email', 'phone', 'whatsapp']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "preferredContactMethod", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do usuário',
        example: 'João Silva Santos Junior',
        maxLength: 150,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'joao.novo@email.com',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Telefone do usuário',
        example: '+244 923 456 789',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de nascimento',
        example: '1990-05-15',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Endereço completo',
        example: 'Rua Nova da Independência, 456',
        required: false,
        maxLength: 300,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cidade',
        example: 'Benguela',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'País',
        example: 'Angola',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da empresa',
        example: 'Petróleo & Gás Angola',
        required: false,
        maxLength: 150,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cargo ou posição',
        example: 'Diretor de TI',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do avatar do usuário',
        example: 'https://exemplo.com/avatars/novo-avatar.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hash da senha',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "passwordHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do Google para login social',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "googleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se o e-mail foi verificado',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "emailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status de ativação do usuário',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Método de contato preferido',
        example: 'phone',
        enum: ['email', 'phone', 'whatsapp'],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['email', 'phone', 'whatsapp']),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "preferredContactMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data do último login (uso interno)',
        example: '2024-08-24T09:45:00.000Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lastLogin", void 0);
class UserFilterDto {
}
exports.UserFilterDto = UserFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Termo de busca por nome, e-mail ou empresa',
        example: 'joão silva',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UserFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por cidade',
        example: 'Luanda',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UserFilterDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por país',
        example: 'Angola',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UserFilterDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por status ativo',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserFilterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por e-mail verificado',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserFilterDto.prototype, "emailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Campo para ordenação',
        example: 'createdAt',
        enum: ['name', 'email', 'createdAt', 'lastLogin', 'city'],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['name', 'email', 'createdAt', 'lastLogin', 'city']),
    __metadata("design:type", String)
], UserFilterDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ordem da ordenação',
        example: 'desc',
        enum: ['asc', 'desc'],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    __metadata("design:type", String)
], UserFilterDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=user.dto.js.map