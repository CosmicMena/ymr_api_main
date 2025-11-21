export declare class OrderItemDto {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    notes?: string;
}
export declare class OrderDto {
    id: string;
    code: string;
    userId: string;
    statusId: string;
    serviceType?: string;
    totalAmount: number;
    currency: string;
    notes?: string;
    deliveryAddress?: string;
    deliveryDate?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class CreateOrderDto {
    userId: string;
    statusId: string;
    serviceType?: string;
    totalAmount: number;
    currency: string;
    notes?: string;
    deliveryAddress?: string;
    deliveryDate?: string;
}
export declare class UpdateOrderDto {
    statusId?: string;
    serviceType?: string;
    totalAmount?: number;
    notes?: string;
    deliveryAddress?: string;
    deliveryDate?: string;
}
export declare class OrderFilterDto {
    search?: string;
    userId?: string;
    statusId?: string;
    serviceType?: string;
    minAmount?: number;
    maxAmount?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: string;
}
