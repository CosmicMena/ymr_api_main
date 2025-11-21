import { UserActivityService } from './user-activity.service';
import { UserActivityDto } from './dto/user-activity.dto';
export declare class UserActivityController {
    private readonly service;
    constructor(service: UserActivityService);
    create(data: Omit<UserActivityDto, 'id'>): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        title: string;
        userId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        color: string | null;
        activityType: string;
        icon: string | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            email: string;
            passwordHash: string | null;
            avatarUrl: string | null;
            lastLogin: Date | null;
            updatedAt: Date;
            phone: string | null;
            company: string | null;
            googleId: string | null;
            birthDate: Date | null;
            address: string | null;
            city: string | null;
            country: string;
            position: string | null;
            emailVerified: boolean;
            preferredContactMethod: string;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        title: string;
        userId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        color: string | null;
        activityType: string;
        icon: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            email: string;
            passwordHash: string | null;
            avatarUrl: string | null;
            lastLogin: Date | null;
            updatedAt: Date;
            phone: string | null;
            company: string | null;
            googleId: string | null;
            birthDate: Date | null;
            address: string | null;
            city: string | null;
            country: string;
            position: string | null;
            emailVerified: boolean;
            preferredContactMethod: string;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        title: string;
        userId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        color: string | null;
        activityType: string;
        icon: string | null;
    }>;
    update(id: string, data: Partial<Omit<UserActivityDto, 'id'>>): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        title: string;
        userId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        color: string | null;
        activityType: string;
        icon: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        title: string;
        userId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        color: string | null;
        activityType: string;
        icon: string | null;
    }>;
}
