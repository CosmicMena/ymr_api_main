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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (user && user.passwordHash && await bcrypt.compare(password, user.passwordHash)) {
            if (!user.isActive) {
                throw new common_1.UnauthorizedException('Account is deactivated');
            }
            await this.prisma.user.update({
                where: { id: user.id },
                data: { lastLogin: new Date() },
            });
            return {
                userId: user.id,
                email: user.email,
                name: user.name,
                userType: 'user',
            };
        }
        const adminUser = await this.prisma.adminUser.findUnique({
            where: { email },
            include: {
                role: {
                    include: {
                        rolePermissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });
        if (adminUser && await bcrypt.compare(password, adminUser.passwordHash)) {
            if (!adminUser.isActive) {
                throw new common_1.UnauthorizedException('Admin account is deactivated');
            }
            await this.prisma.adminUser.update({
                where: { id: adminUser.id },
                data: { lastLogin: new Date() },
            });
            const permissions = adminUser.role.rolePermissions.map(rp => rp.permission.name);
            return {
                userId: adminUser.id,
                email: adminUser.email,
                name: adminUser.name,
                userType: 'admin',
                role: adminUser.role.name,
                permissions,
            };
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.userId,
            email: user.email,
            userType: user.userType,
            role: user.role,
            permissions: user.permissions,
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign({ sub: user.userId, type: 'refresh' }, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        });
        await this.logActivity(user.userId, user.userType, 'login', 'User logged in successfully');
        return {
            user: {
                id: user.userId,
                email: user.email,
                name: user.name,
                userType: user.userType,
                role: user.role,
                permissions: user.permissions,
            },
            tokens: {
                accessToken,
                refreshToken,
                expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists with this email');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 12);
        const user = await this.prisma.user.create({
            data: {
                name: registerDto.name,
                email: registerDto.email,
                phone: registerDto.phone,
                company: registerDto.company,
                passwordHash: hashedPassword,
            },
        });
        await this.prisma.userStatistics.create({
            data: {
                userId: user.id,
            },
        });
        await this.logActivity(user.id, 'user', 'register', 'User registered successfully');
        const payload = {
            sub: user.id,
            email: user.email,
            userType: 'user',
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign({ sub: user.id, type: 'refresh' }, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                userType: 'user',
            },
            tokens: {
                accessToken,
                refreshToken,
                expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
            },
        };
    }
    async refreshToken(refreshTokenDto) {
        try {
            const decoded = this.jwtService.verify(refreshTokenDto.refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            if (decoded.type !== 'refresh') {
                throw new common_1.UnauthorizedException('Invalid token type');
            }
            let user = await this.prisma.user.findUnique({
                where: { id: decoded.sub },
            });
            let userType = 'user';
            let role = null;
            let permissions = [];
            if (!user) {
                const adminUser = await this.prisma.adminUser.findUnique({
                    where: { id: decoded.sub },
                    include: {
                        role: {
                            include: {
                                rolePermissions: {
                                    include: {
                                        permission: true,
                                    },
                                },
                            },
                        },
                    },
                });
                if (!adminUser) {
                    throw new common_1.UnauthorizedException('User not found');
                }
                user = adminUser;
                userType = 'admin';
                role = adminUser.role.name;
                permissions = adminUser.role.rolePermissions.map(rp => rp.permission.name);
            }
            if (!user.isActive) {
                throw new common_1.UnauthorizedException('Account is deactivated');
            }
            const payload = {
                sub: user.id,
                email: user.email,
                userType,
                role,
                permissions,
            };
            const accessToken = this.jwtService.sign(payload);
            return {
                accessToken,
                expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logActivity(userId, userType, action, description) {
        const logData = {
            action,
            description,
            resourceType: 'authentication',
        };
        if (userType === 'user') {
            logData.userId = userId;
        }
        else {
            logData.adminId = userId;
        }
        await this.prisma.activityLog.create({
            data: logData,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map