import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartDto, ShoppingCartFilterDto } from './dto/shopping-cart.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
export declare class ShoppingCartController {
    private readonly service;
    constructor(service: ShoppingCartService);
    create(data: Omit<ShoppingCartDto, 'createdAt' | 'updatedAt'>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
    }>>;
    findAll(pagination: PaginationDto, filter: ShoppingCartFilterDto): Promise<SuccessResponseDto<{
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
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
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
    }>>;
    update(id: string, data: Partial<Omit<ShoppingCartDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
