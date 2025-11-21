export declare class ActivityLogDto {
    id: string;
    userId?: string;
    adminId?: string;
    action: string;
    description?: string;
    resourceType?: string;
    resourceId?: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: any;
    createdAt: string;
}
declare const CreateActivityLogDto_base: import("@nestjs/common").Type<Omit<ActivityLogDto, "id" | "createdAt">>;
export declare class CreateActivityLogDto extends CreateActivityLogDto_base {
}
declare const UpdateActivityLogDto_base: import("@nestjs/common").Type<Partial<CreateActivityLogDto>>;
export declare class UpdateActivityLogDto extends UpdateActivityLogDto_base {
}
export declare class ActivityLogFilterDto {
    userId?: string;
    adminId?: string;
    action?: string;
    resourceType?: string;
    startDate?: string;
    endDate?: string;
}
export {};
