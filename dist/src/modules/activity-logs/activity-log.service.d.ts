import { PrismaService } from '../../common/prisma/prisma.service';
import { ActivityLogDto } from './dto/activity-log.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ActivityLogFilterDto } from './dto/activity-log.dto';
export declare class ActivityLogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<ActivityLogDto, 'id' | 'createdAt'>): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        action: string;
        userId: string | null;
        resourceType: string | null;
        resourceId: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        adminId: string | null;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: ActivityLogFilterDto): Promise<{
        data: {
            id: string;
            description: string | null;
            createdAt: Date;
            action: string;
            userId: string | null;
            resourceType: string | null;
            resourceId: string | null;
            ipAddress: string | null;
            userAgent: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            adminId: string | null;
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
        description: string | null;
        createdAt: Date;
        action: string;
        userId: string | null;
        resourceType: string | null;
        resourceId: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        adminId: string | null;
    }>;
    update(id: string, data: Partial<Omit<ActivityLogDto, 'id' | 'createdAt'>>): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        action: string;
        userId: string | null;
        resourceType: string | null;
        resourceId: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        adminId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        action: string;
        userId: string | null;
        resourceType: string | null;
        resourceId: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        adminId: string | null;
    }>;
}
