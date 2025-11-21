import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto, OrderFilterDto } from './dto/order.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class OrderService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        _count: {
            orderItems: number;
        };
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
        };
        status: {
            id: string;
            name: string;
            description: string;
        };
        orderItems: ({
            product: {
                id: string;
                name: string;
                code: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            id: string;
            createdAt: Date;
            productId: string | null;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal | null;
            totalPrice: import("@prisma/client/runtime/library").Decimal | null;
            orderId: string;
            serviceDescription: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        code: string;
        notes: string | null;
        statusId: string;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        deliveryAddress: string | null;
        deliveryDate: Date | null;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: OrderFilterDto): Promise<{
        data: ({
            _count: {
                orderItems: number;
            };
            user: {
                id: string;
                name: string;
                email: string;
            };
            status: {
                id: string;
                name: string;
            };
            orderItems: {
                id: string;
                quantity: number;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            code: string;
            notes: string | null;
            statusId: string;
            serviceType: string | null;
            totalAmount: import("@prisma/client/runtime/library").Decimal | null;
            currency: string;
            deliveryAddress: string | null;
            deliveryDate: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findActiveOrders(limit?: number): Promise<({
        _count: {
            orderItems: number;
        };
        user: {
            id: string;
            name: string;
            email: string;
        };
        status: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        code: string;
        notes: string | null;
        statusId: string;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        deliveryAddress: string | null;
        deliveryDate: Date | null;
    })[]>;
    findUrgentOrders(limit?: number): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
        };
        status: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        code: string;
        notes: string | null;
        statusId: string;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        deliveryAddress: string | null;
        deliveryDate: Date | null;
    })[]>;
    getOrderStats(): Promise<{
        totalOrders: number;
        ordersThisMonth: number;
        ordersByStatus: {};
        ordersByServiceType: {};
        totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        averageOrderValue: number | import("@prisma/client/runtime/library").Decimal;
    }>;
    findOne(id: string): Promise<{
        _count: {
            orderItems: number;
        };
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            address: string;
            city: string;
            country: string;
        };
        status: {
            id: string;
            name: string;
            description: string;
        };
        orderItems: ({
            product: {
                id: string;
                name: string;
                description: string;
                brand: {
                    id: string;
                    name: string;
                };
                code: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            id: string;
            createdAt: Date;
            productId: string | null;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal | null;
            totalPrice: import("@prisma/client/runtime/library").Decimal | null;
            orderId: string;
            serviceDescription: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        code: string;
        notes: string | null;
        statusId: string;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        deliveryAddress: string | null;
        deliveryDate: Date | null;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        status: {
            id: string;
            name: string;
        };
        orderItems: {
            id: string;
            createdAt: Date;
            productId: string | null;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal | null;
            totalPrice: import("@prisma/client/runtime/library").Decimal | null;
            orderId: string;
            serviceDescription: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        code: string;
        notes: string | null;
        statusId: string;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        deliveryAddress: string | null;
        deliveryDate: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        code: string;
        notes: string | null;
        statusId: string;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        deliveryAddress: string | null;
        deliveryDate: Date | null;
    }>;
    private generateUniqueOrderCode;
}
