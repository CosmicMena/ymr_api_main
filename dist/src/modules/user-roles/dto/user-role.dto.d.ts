export declare class UserRoleDto {
    id: string;
    name: string;
    description?: string;
    permissions?: any;
    isActive: boolean;
    createdAt: string;
}
declare const CreateUserRoleDto_base: import("@nestjs/common").Type<Omit<UserRoleDto, "id" | "createdAt">>;
export declare class CreateUserRoleDto extends CreateUserRoleDto_base {
}
declare const UpdateUserRoleDto_base: import("@nestjs/common").Type<Partial<CreateUserRoleDto>>;
export declare class UpdateUserRoleDto extends UpdateUserRoleDto_base {
}
export declare class UserRoleFilterDto {
    name?: string;
    isActive?: boolean;
    startDate?: string;
    endDate?: string;
}
export {};
