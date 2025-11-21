import { PrismaService } from '../../common/prisma/prisma.service';
import { QuoteItemDto } from './dto/quote-item.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { QuoteItemFilterDto } from './dto/quote-item.dto';
export declare class QuoteItemService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<QuoteItemDto, 'id' | 'createdAt'>): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        notes: string | null;
        quoteRequestId: string;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: QuoteItemFilterDto): Promise<{
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
            quoteRequest: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                code: string;
                notes: string | null;
                statusId: string;
                totalItems: number;
                adminNotes: string | null;
                expiresAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal | null;
            totalPrice: import("@prisma/client/runtime/library").Decimal | null;
            notes: string | null;
            quoteRequestId: string;
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
        quoteRequest: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            code: string;
            notes: string | null;
            statusId: string;
            totalItems: number;
            adminNotes: string | null;
            expiresAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        notes: string | null;
        quoteRequestId: string;
    }>;
    update(id: string, data: Partial<Omit<QuoteItemDto, 'id' | 'createdAt'>>): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        notes: string | null;
        quoteRequestId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        notes: string | null;
        quoteRequestId: string;
    }>;
}
