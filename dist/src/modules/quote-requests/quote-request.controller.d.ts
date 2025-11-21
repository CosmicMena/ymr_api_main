import { QuoteRequestService } from './quote-request.service';
import { QuoteRequestDto, QuoteRequestFilterDto } from './dto/quote-request.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class QuoteRequestController {
    private readonly service;
    constructor(service: QuoteRequestService);
    create(data: Omit<QuoteRequestDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<SuccessResponseDto<{
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
    }>>;
    findAll(pagination: PaginationDto, filter: QuoteRequestFilterDto): Promise<SuccessResponseDto<{
        data: ({
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
            status: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                color: string | null;
            };
            quoteItems: {
                id: string;
                createdAt: Date;
                productId: string;
                quantity: number;
                unitPrice: import("@prisma/client/runtime/library").Decimal | null;
                totalPrice: import("@prisma/client/runtime/library").Decimal | null;
                notes: string | null;
                quoteRequestId: string;
            }[];
        } & {
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
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
        status: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            color: string | null;
        };
        quoteItems: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal | null;
            totalPrice: import("@prisma/client/runtime/library").Decimal | null;
            notes: string | null;
            quoteRequestId: string;
        }[];
    } & {
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
    }>>;
    update(id: string, data: Partial<Omit<QuoteRequestDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SuccessResponseDto<{
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
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
