import { PrismaService } from '../../common/prisma/prisma.service';
import { UserStatisticsDto } from './dto/user-statistics.dto';
export declare class UserStatisticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<UserStatisticsDto, 'id'>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ordersCount: number;
        consultationsCount: number;
        rentalsCount: number;
        loyaltyPoints: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastActivity: Date | null;
        userId: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ordersCount: number;
        consultationsCount: number;
        rentalsCount: number;
        loyaltyPoints: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastActivity: Date | null;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ordersCount: number;
        consultationsCount: number;
        rentalsCount: number;
        loyaltyPoints: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastActivity: Date | null;
        userId: string;
    }>;
    findByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ordersCount: number;
        consultationsCount: number;
        rentalsCount: number;
        loyaltyPoints: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastActivity: Date | null;
        userId: string;
    }>;
    update(id: string, data: Partial<Omit<UserStatisticsDto, 'id'>>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ordersCount: number;
        consultationsCount: number;
        rentalsCount: number;
        loyaltyPoints: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastActivity: Date | null;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ordersCount: number;
        consultationsCount: number;
        rentalsCount: number;
        loyaltyPoints: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastActivity: Date | null;
        userId: string;
    }>;
}
