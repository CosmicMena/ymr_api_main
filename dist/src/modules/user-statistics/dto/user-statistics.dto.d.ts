export declare class UserStatisticsDto {
    id: string;
    userId: string;
    ordersCount: number;
    consultationsCount: number;
    rentalsCount: number;
    loyaltyPoints: number;
    totalSpent: number;
    lastActivity?: string;
    createdAt: string;
    updatedAt: string;
}
declare const UpdateUserStatisticsDto_base: import("@nestjs/common").Type<Partial<UserStatisticsDto>>;
export declare class UpdateUserStatisticsDto extends UpdateUserStatisticsDto_base {
}
export declare class UserStatisticsFilterDto {
    userId?: string;
    minOrders?: number;
    minTotalSpent?: number;
    startDate?: string;
    endDate?: string;
}
export {};
