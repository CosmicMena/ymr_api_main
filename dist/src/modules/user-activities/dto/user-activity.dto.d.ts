export declare class UserActivityDto {
    id: string;
    userId: string;
    activityType: string;
    title: string;
    description?: string;
    icon?: string;
    color?: string;
    metadata?: any;
    createdAt: string;
}
declare const CreateUserActivityDto_base: import("@nestjs/common").Type<Omit<UserActivityDto, "id" | "createdAt">>;
export declare class CreateUserActivityDto extends CreateUserActivityDto_base {
}
declare const UpdateUserActivityDto_base: import("@nestjs/common").Type<Partial<CreateUserActivityDto>>;
export declare class UpdateUserActivityDto extends UpdateUserActivityDto_base {
}
export declare class UserActivityFilterDto {
    userId?: string;
    activityType?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
}
export {};
