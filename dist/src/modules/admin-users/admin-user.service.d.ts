import { PrismaService } from '../../common/prisma/prisma.service';
import { AdminUserDto } from './dto/admin-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AdminUserFilterDto } from './dto/admin-user.dto';
export declare class AdminUserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<AdminUserDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<{
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
    }>;
    findAll(paginationDto: PaginationDto, filterDto: AdminUserFilterDto): Promise<{
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
    }>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, data: Partial<Omit<AdminUserDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
