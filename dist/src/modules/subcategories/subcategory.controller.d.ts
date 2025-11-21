import { SubcategoryService } from './subcategory.service';
import { SubcategoryDto, SubcategoryListQueryDto } from './dto/subcategory.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
export declare class SubcategoryController {
    private readonly service;
    constructor(service: SubcategoryService);
    create(data: Omit<SubcategoryDto, 'id'>): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>>;
    findAll(query: SubcategoryListQueryDto): Promise<SuccessResponseDto<{
        data: ({
            category: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
            };
        } & {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
        category: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
        };
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>>;
    update(id: string, data: Partial<Omit<SubcategoryDto, 'id'>>): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
