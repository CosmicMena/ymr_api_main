import { UserFavoritesService } from './user-favorites.service';
import { UserFavoriteDto } from './dto/user-favorite.dto';
export declare class UserFavoritesController {
    private readonly service;
    constructor(service: UserFavoritesService);
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
