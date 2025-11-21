import { AdminUserService } from './admin-user.service';
import { AdminUserDto, AdminUserFilterDto } from './dto/admin-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
export declare class AdminUserController {
    private readonly adminUserService;
    constructor(adminUserService: AdminUserService);
    create(data: Omit<AdminUserDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        roleId: string;
        email: string;
        passwordHash: string;
        avatarUrl: string | null;
        lastLogin: Date | null;
        createdBy: string | null;
        updatedAt: Date;
    }>>;
    findAll(pagination: PaginationDto, filter: AdminUserFilterDto): Promise<SuccessResponseDto<{
        data: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            roleId: string;
            email: string;
            passwordHash: string;
            avatarUrl: string | null;
            lastLogin: Date | null;
            createdBy: string | null;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        roleId: string;
        email: string;
        passwordHash: string;
        avatarUrl: string | null;
        lastLogin: Date | null;
        createdBy: string | null;
        updatedAt: Date;
    }>>;
    update(id: string, data: Partial<Omit<AdminUserDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        roleId: string;
        email: string;
        passwordHash: string;
        avatarUrl: string | null;
        lastLogin: Date | null;
        createdBy: string | null;
        updatedAt: Date;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
