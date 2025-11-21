import { QuoteItemService } from './quote-item.service';
import { QuoteItemDto, QuoteItemFilterDto } from './dto/quote-item.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class QuoteItemController {
    private readonly service;
    constructor(service: QuoteItemService);
    create(data: Omit<QuoteItemDto, 'id' | 'createdAt'>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        notes: string | null;
        quoteRequestId: string;
    }>>;
    findAll(pagination: PaginationDto, filter: QuoteItemFilterDto): Promise<SuccessResponseDto<{
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
    }>>;
    update(id: string, data: Partial<Omit<QuoteItemDto, 'id' | 'createdAt'>>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        notes: string | null;
        quoteRequestId: string;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
