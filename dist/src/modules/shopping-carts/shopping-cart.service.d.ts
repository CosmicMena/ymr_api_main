import { PrismaService } from '../../common/prisma/prisma.service';
import { ShoppingCartDto } from './dto/shopping-cart.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ShoppingCartFilterDto } from './dto/shopping-cart.dto';
export declare class ShoppingCartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<ShoppingCartDto, 'createdAt' | 'updatedAt'>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: ShoppingCartFilterDto): Promise<{
        data: ({
            product: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                model: string | null;
                features: string[];
                images: string[];
                specifications: import("@prisma/client/runtime/library").JsonValue | null;
                documents: import("@prisma/client/runtime/library").JsonValue | null;
                availability: string;
                price: import("@prisma/client/runtime/library").Decimal;
                stockQuantity: number;
                subcategoryId: string | null;
                brandId: string | null;
                viewCount: number;
            };
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
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            productId: string;
            quantity: number;
            sessionId: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        product: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            model: string | null;
            features: string[];
            images: string[];
            specifications: import("@prisma/client/runtime/library").JsonValue | null;
            documents: import("@prisma/client/runtime/library").JsonValue | null;
            availability: string;
            price: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            subcategoryId: string | null;
            brandId: string | null;
            viewCount: number;
        };
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
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
    }>;
    update(id: string, data: Partial<Omit<ShoppingCartDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
    }>;
}
