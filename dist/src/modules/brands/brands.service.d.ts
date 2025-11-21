import { PrismaService } from '../../common/prisma/prisma.service';
import { BrandDto } from './dto/brand.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { BrandFilterDto } from './dto/brand.dto';
export declare class BrandService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<BrandDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<{
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: BrandFilterDto): Promise<{
        data: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            logoUrl: string | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>;
    update(id: string, data: Partial<Omit<BrandDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<{
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>;
}
