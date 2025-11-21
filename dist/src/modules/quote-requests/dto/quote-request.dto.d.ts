export declare class QuoteRequestDto {
    id: string;
    code: string;
    userId: string;
    statusId: string;
    totalItems: number;
    notes?: string;
    adminNotes?: string;
    expiresAt?: string;
    createdAt: string;
    updatedAt: string;
}
declare const CreateQuoteRequestDto_base: import("@nestjs/common").Type<Omit<QuoteRequestDto, "id" | "createdAt" | "updatedAt" | "code">>;
export declare class CreateQuoteRequestDto extends CreateQuoteRequestDto_base {
}
declare const UpdateQuoteRequestDto_base: import("@nestjs/common").Type<Partial<CreateQuoteRequestDto>>;
export declare class UpdateQuoteRequestDto extends UpdateQuoteRequestDto_base {
}
export declare class QuoteRequestFilterDto {
    search?: string;
    userId?: string;
    statusId?: string;
    startDate?: string;
    endDate?: string;
}
export {};
