export declare class UserFavoriteDto {
    id: string;
    userId: string;
    productId: string;
    createdAt: string;
}
declare const CreateUserFavoriteDto_base: import("@nestjs/common").Type<Omit<UserFavoriteDto, "id" | "createdAt">>;
export declare class CreateUserFavoriteDto extends CreateUserFavoriteDto_base {
}
declare const UpdateUserFavoriteDto_base: import("@nestjs/common").Type<Partial<CreateUserFavoriteDto>>;
export declare class UpdateUserFavoriteDto extends UpdateUserFavoriteDto_base {
}
export declare class UserFavoriteFilterDto {
    userId?: string;
    productId?: string;
    startDate?: string;
    endDate?: string;
}
export {};
