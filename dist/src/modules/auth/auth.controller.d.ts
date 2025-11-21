import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<SuccessResponseDto<{
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
    }>>;
    register(registerDto: RegisterDto): Promise<SuccessResponseDto<{
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
    }>>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<SuccessResponseDto<{
        accessToken: string;
        expiresIn: any;
    }>>;
}
