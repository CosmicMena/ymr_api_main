export declare class ShoppingCartDto {
    id: string;
    userId?: string;
    sessionId?: string;
    productId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}
declare const CreateShoppingCartDto_base: import("@nestjs/common").Type<Omit<ShoppingCartDto, "id" | "createdAt" | "updatedAt">>;
export declare class CreateShoppingCartDto extends CreateShoppingCartDto_base {
}
declare const UpdateShoppingCartDto_base: import("@nestjs/common").Type<Partial<CreateShoppingCartDto>>;
export declare class UpdateShoppingCartDto extends UpdateShoppingCartDto_base {
}
export declare class ShoppingCartFilterDto {
    userId?: string;
    sessionId?: string;
    productId?: string;
    startDate?: string;
    endDate?: string;
}
export {};
