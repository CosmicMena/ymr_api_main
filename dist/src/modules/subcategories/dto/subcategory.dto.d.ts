import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class SubcategoryDto {
    id: string;
    name: string;
    categoryId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
declare const CreateSubcategoryDto_base: import("@nestjs/common").Type<Omit<SubcategoryDto, "id" | "createdAt" | "updatedAt">>;
export declare class CreateSubcategoryDto extends CreateSubcategoryDto_base {
}
declare const UpdateSubcategoryDto_base: import("@nestjs/common").Type<Partial<CreateSubcategoryDto>>;
export declare class UpdateSubcategoryDto extends UpdateSubcategoryDto_base {
}
export declare class SubcategoryFilterDto {
    search?: string;
    categoryId?: string;
    isActive?: boolean;
}
export declare class SubcategoryListQueryDto extends PaginationDto {
    search?: string;
    categoryId?: string;
    isActive?: boolean;
}
export {};
