export declare class AdminUserDto {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    avatarUrl?: string;
    roleId: string;
    isActive: boolean;
    lastLogin?: string;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
}
declare const CreateAdminUserDto_base: import("@nestjs/common").Type<Omit<AdminUserDto, "id" | "createdAt" | "passwordHash" | "lastLogin" | "updatedAt">>;
export declare class CreateAdminUserDto extends CreateAdminUserDto_base {
    password: string;
}
declare const UpdateAdminUserDto_base: import("@nestjs/common").Type<Partial<CreateAdminUserDto>>;
export declare class UpdateAdminUserDto extends UpdateAdminUserDto_base {
}
export declare class AdminUserFilterDto {
    search?: string;
    roleId?: string;
    isActive?: boolean;
    startDate?: string;
    endDate?: string;
}
export {};
