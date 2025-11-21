import { PrismaService } from '../../common/prisma/prisma.service';
import { UserRoleDto } from './dto/user-role.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UserRoleFilterDto } from './dto/user-role.dto';
export declare class UserRolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<UserRoleDto, 'id'>): Promise<{
        id: string;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: UserRoleFilterDto): Promise<{
        data: {
            id: string;
            name: string;
            description: string | null;
            permissions: import("@prisma/client/runtime/library").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
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
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
    }>;
    update(id: string, data: Partial<Omit<UserRoleDto, 'id'>>): Promise<{
        id: string;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
    }>;
}
