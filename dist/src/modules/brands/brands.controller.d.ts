import { BrandService } from './brands.service';
import { BrandDto, BrandFilterDto } from './dto/brand.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    create(createBrandDto: Omit<BrandDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>>;
    findAll(pagination: PaginationDto, filter: BrandFilterDto): Promise<SuccessResponseDto<{
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
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>>;
    update(id: string, updateBrandDto: Partial<Omit<BrandDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SuccessResponseDto<{
        id: string;
        name: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
