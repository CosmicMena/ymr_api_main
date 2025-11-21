import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserFilterDto } from './dto/user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        email: string;
        city: string;
        country: string;
        emailVerified: boolean;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: UserFilterDto): Promise<{
        data: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            email: string;
            avatarUrl: string;
            lastLogin: Date;
            updatedAt: Date;
            phone: string;
            company: string;
            city: string;
            country: string;
            position: string;
            emailVerified: boolean;
            preferredContactMethod: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findActiveUsers(limit?: number): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        email: string;
        company: string;
        city: string;
        country: string;
    }[]>;
    getUserStats(): Promise<{
        totalUsers: number;
        activeUsers: number;
        verifiedUsers: number;
        newUsersThisMonth: number;
        usersByCountry: {};
        usersByCities: {};
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        email: string;
        avatarUrl: string;
        lastLogin: Date;
        updatedAt: Date;
        phone: string;
        company: string;
        birthDate: Date;
        address: string;
        city: string;
        country: string;
        position: string;
        emailVerified: boolean;
        preferredContactMethod: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        email: string;
        updatedAt: Date;
        city: string;
        country: string;
        emailVerified: boolean;
    }>;
    verifyEmail(id: string): Promise<{
        id: string;
        email: string;
        updatedAt: Date;
        emailVerified: boolean;
    }>;
    toggleStatus(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        email: string;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        email: string;
        updatedAt: Date;
    }>;
    updateLastLogin(id: string): Promise<{
        id: string;
        lastLogin: Date;
    }>;
    findByEmail(email: string): Promise<{
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
    }>;
    findByGoogleId(googleId: string): Promise<{
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
    }>;
    getRecentUsers(days?: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        city: string;
        country: string;
    }[]>;
}
