export declare class BrandDto {
    id: string;
    name: string;
    logoUrl?: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
declare const CreateBrandDto_base: import("@nestjs/common").Type<Omit<BrandDto, "id" | "createdAt" | "updatedAt">>;
export declare class CreateBrandDto extends CreateBrandDto_base {
}
declare const UpdateBrandDto_base: import("@nestjs/common").Type<Partial<CreateBrandDto>>;
export declare class UpdateBrandDto extends UpdateBrandDto_base {
}
export declare class BrandFilterDto {
    search?: string;
    isActive?: boolean;
}
export {};
