import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
            userType: any;
            role: any;
            permissions: any;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            userType: string;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: any;
        };
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        expiresIn: any;
    }>;
    private logActivity;
}
