import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserFilterDto } from './dto/user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    getExampleUser(): {
        id: string;
        name: string;
        email: string;
        phone: string;
        birthDate: string;
        address: string;
        city: string;
        country: string;
        company: string;
        position: string;
        avatarUrl: string;
        emailVerified: boolean;
        isActive: boolean;
        preferredContactMethod: string;
        createdAt: string;
        updatedAt: string;
        lastLogin: string;
    };
}
