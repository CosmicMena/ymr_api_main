export declare class CategoryDto {
    id: string;
    name: string;
    imageUrl?: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class CreateCategoryDto {
    name: string;
    imageUrl?: string;
    description?: string;
    isActive: boolean;
}
export declare class UpdateCategoryDto {
    name?: string;
    imageUrl?: string;
    description?: string;
    isActive?: boolean;
}
export declare class CategoryFilterDto {
    isActive?: boolean;
    search?: string;
}
