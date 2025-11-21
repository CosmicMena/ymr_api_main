import { UserRolesService } from './user-roles.service';
import { UserRoleDto, UserRoleFilterDto } from './dto/user-role.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
export declare class UserRolesController {
    private readonly service;
    constructor(service: UserRolesService);
    create(data: Omit<UserRoleDto, 'id'>): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
    }>>;
    findAll(pagination: PaginationDto, filter: UserRoleFilterDto): Promise<SuccessResponseDto<{
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
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
    }>>;
    update(id: string, data: Partial<Omit<UserRoleDto, 'id'>>): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
