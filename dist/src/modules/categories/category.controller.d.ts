import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, CategoryFilterDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        _count: {
            subcategories: number;
        };
        subcategories: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
    }>;
    findAll(filterDto: CategoryFilterDto): Promise<{
        id: string;
        name: string;
        description: string;
        isActive: boolean;
        _count: {
            subcategories: number;
        };
        imageUrl: string;
    }[]>;
    findActiveCategories(): Promise<{
        id: string;
        name: string;
        description: string;
        isActive: boolean;
        _count: {
            subcategories: number;
        };
        imageUrl: string;
    }[]>;
    findOne(id: string): Promise<{
        _count: {
            subcategories: number;
        };
        subcategories: {
            id: string;
            name: string;
            isActive: boolean;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        _count: {
            subcategories: number;
        };
        subcategories: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
    }>;
}
