import { PrismaService } from '../../common/prisma/prisma.service';
import { SubcategoryDto } from './dto/subcategory.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SubcategoryFilterDto } from './dto/subcategory.dto';
export declare class SubcategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<SubcategoryDto, 'id'>): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: SubcategoryFilterDto): Promise<{
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
    }>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, data: Partial<Omit<SubcategoryDto, 'id'>>): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
}
