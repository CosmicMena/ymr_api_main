import { PrismaService } from '../../common/prisma/prisma.service';
import { UserFavoriteDto } from './dto/user-favorite.dto';
export declare class UserFavoritesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<UserFavoriteDto, 'id' | 'createdAt'>): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
    findByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
}
