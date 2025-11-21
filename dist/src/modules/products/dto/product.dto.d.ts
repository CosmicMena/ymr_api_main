import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class CreateProductDto {
    code: string;
    name: string;
    model?: string;
    description?: string;
    features?: string[];
    images?: string[];
    specifications?: any;
    documents?: any;
    availability?: string;
    price: number;
    stockQuantity?: number;
    isActive?: boolean;
    subcategoryId?: string;
    brandId?: string;
}
export declare class UpdateProductDto {
    code?: string;
    name?: string;
    model?: string;
    description?: string;
    features?: string[];
    images?: string[];
    specifications?: any;
    documents?: any;
    availability?: string;
    price?: number;
    stockQuantity?: number;
    isActive?: boolean;
    subcategoryId?: string;
    brandId?: string;
}
export declare class ProductFilterDto {
    brandId?: string;
    subcategoryId?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
}
export declare class ProductListQueryDto extends PaginationDto {
    brandId?: string;
    subcategoryId?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
}
