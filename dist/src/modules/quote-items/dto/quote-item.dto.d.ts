export declare class QuoteItemDto {
    id: string;
    quoteRequestId: string;
    productId: string;
    quantity: number;
    unitPrice?: number;
    totalPrice?: number;
    notes?: string;
    createdAt: string;
}
declare const CreateQuoteItemDto_base: import("@nestjs/common").Type<Omit<QuoteItemDto, "id" | "createdAt">>;
export declare class CreateQuoteItemDto extends CreateQuoteItemDto_base {
}
declare const UpdateQuoteItemDto_base: import("@nestjs/common").Type<Partial<CreateQuoteItemDto>>;
export declare class UpdateQuoteItemDto extends UpdateQuoteItemDto_base {
}
export declare class QuoteItemFilterDto {
    quoteRequestId?: string;
    productId?: string;
    startDate?: string;
    endDate?: string;
}
export {};
