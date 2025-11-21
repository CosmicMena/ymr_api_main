import { OrderItemService } from './order-item.service';
import { OrderItemDto, OrderItemFilterDto } from './dto/order-item.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class OrderItemController {
    private readonly service;
    constructor(service: OrderItemService);
    create(data: Omit<OrderItemDto, 'id' | 'createdAt'>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        productId: string | null;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        orderId: string;
        serviceDescription: string | null;
    }>>;
    findAll(pagination: PaginationDto, filter: OrderItemFilterDto): Promise<SuccessResponseDto<{
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
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        productId: string | null;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        orderId: string;
        serviceDescription: string | null;
    }>>;
    update(id: string, data: Partial<Omit<OrderItemDto, 'id' | 'createdAt'>>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        productId: string | null;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal | null;
        totalPrice: import("@prisma/client/runtime/library").Decimal | null;
        orderId: string;
        serviceDescription: string | null;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
