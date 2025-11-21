import { PrismaService } from '../../common/prisma/prisma.service';
import { OrderItemDto } from './dto/order-item.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { OrderItemFilterDto } from './dto/order-item.dto';
export declare class OrderItemService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<OrderItemDto, 'id' | 'createdAt'>): Promise<{
        id: string;
        createdAt: Date;
        productId: string | null;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        orderId: string;
        serviceDescription: string | null;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: OrderItemFilterDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            productId: string | null;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal | null;
            totalPrice: import("@prisma/client/runtime/library").Decimal | null;
            orderId: string;
            serviceDescription: string | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string | null;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        orderId: string;
        serviceDescription: string | null;
    }>;
    update(id: string, data: Partial<Omit<OrderItemDto, 'id' | 'createdAt'>>): Promise<{
        id: string;
        createdAt: Date;
        productId: string | null;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        orderId: string;
        serviceDescription: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string | null;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        orderId: string;
        serviceDescription: string | null;
    }>;
}
