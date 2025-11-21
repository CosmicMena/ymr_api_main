export declare class OrderItemDto {
    id: string;
    orderId: string;
    productId?: string;
    serviceDescription?: string;
    quantity: number;
    unitPrice?: number;
    totalPrice?: number;
    createdAt: string;
}
declare const CreateOrderItemDto_base: import("@nestjs/common").Type<Omit<OrderItemDto, "id" | "createdAt">>;
export declare class CreateOrderItemDto extends CreateOrderItemDto_base {
}
declare const UpdateOrderItemDto_base: import("@nestjs/common").Type<Partial<CreateOrderItemDto>>;
export declare class UpdateOrderItemDto extends UpdateOrderItemDto_base {
}
export declare class OrderItemFilterDto {
    orderId?: string;
    productId?: string;
    startDate?: string;
    endDate?: string;
}
export {};
