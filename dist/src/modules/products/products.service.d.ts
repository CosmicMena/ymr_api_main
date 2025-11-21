import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto/product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        brand: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            logoUrl: string | null;
        };
        subcategory: {
            category: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
            };
        } & {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        };
    } & {
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
    }>;
    findAll(paginationDto: PaginationDto, filterDto: ProductFilterDto): Promise<{
        data: unknown[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    findOne(id: string): Promise<{
        _count: {
            userFavorites: number;
            quoteItems: number;
            orderItems: number;
        };
        brand: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            logoUrl: string | null;
        };
        subcategory: {
            category: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
            };
        } & {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        };
    } & {
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
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        brand: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            logoUrl: string | null;
        };
        subcategory: {
            category: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
            };
        } & {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        };
    } & {
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    getPopularProducts(limit?: number): Promise<({
        brand: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            logoUrl: string | null;
        };
        subcategory: {
            category: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
            };
        } & {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        };
    } & {
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
    })[]>;
    getFeaturedProducts(limit?: number): Promise<({
        brand: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            logoUrl: string | null;
        };
        subcategory: {
            category: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
            };
        } & {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        };
    } & {
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
    })[]>;
}
