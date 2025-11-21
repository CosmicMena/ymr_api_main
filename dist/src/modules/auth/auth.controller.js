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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        const result = await this.authService.login(loginDto);
        return new response_dto_1.SuccessResponseDto('Login successful', result);
    }
    async register(registerDto) {
        const result = await this.authService.register(registerDto);
        return new response_dto_1.SuccessResponseDto('Registration successful', result);
    }
    async refreshToken(refreshTokenDto) {
        const result = await this.authService.refreshToken(refreshTokenDto);
        return new response_dto_1.SuccessResponseDto('Token refreshed successfully', result);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'User login',
        description: 'Authenticate user with email and password. Returns access token and refresh token.'
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginDto, examples: { exemplo: { value: { email: 'user@example.com', password: 'SecurePassword123!' } } } }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login successful',
        type: response_dto_1.SuccessResponseDto,
        schema: {
            example: {
                success: true,
                message: 'Login successful',
                data: {
                    user: { id: 'uuid', email: 'user@example.com', name: 'John Doe', userType: 'user' },
                    tokens: { accessToken: 'jwt_token', refreshToken: 'refresh_token', expiresIn: '1h' }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'User registration',
        description: 'Register a new user account. Creates user profile and returns authentication tokens.'
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.RegisterDto, examples: { exemplo: { value: { name: 'John Doe', email: 'john@example.com', password: 'SecurePassword123!', phone: '+244 912 345 678', company: 'Tech Solutions' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Registration successful', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already exists' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Refresh access token',
        description: 'Generate new access token using refresh token.'
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.RefreshTokenDto, examples: { exemplo: { value: { refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token refreshed successfully', type: response_dto_1.SuccessResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid refresh token' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiProduces)('application/json'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map