import { ActivityLogService } from './activity-log.service';
import { ActivityLogDto, ActivityLogFilterDto } from './dto/activity-log.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
export declare class ActivityLogController {
    private readonly activityLogService;
    constructor(activityLogService: ActivityLogService);
    create(data: Omit<ActivityLogDto, 'id' | 'createdAt'>): Promise<SuccessResponseDto<{
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
    }>>;
    findAll(pagination: PaginationDto, filter: ActivityLogFilterDto): Promise<SuccessResponseDto<{
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
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
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
    }>>;
    update(id: string, data: Partial<Omit<ActivityLogDto, 'id' | 'createdAt'>>): Promise<SuccessResponseDto<{
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
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
