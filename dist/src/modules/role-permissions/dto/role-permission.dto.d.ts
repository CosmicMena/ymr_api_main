export declare class RolePermissionDto {
    roleId: string;
    permissionId: string;
    grantedAt: string;
}
declare const CreateRolePermissionDto_base: import("@nestjs/common").Type<Omit<RolePermissionDto, "grantedAt">>;
export declare class CreateRolePermissionDto extends CreateRolePermissionDto_base {
}
declare const UpdateRolePermissionDto_base: import("@nestjs/common").Type<Partial<CreateRolePermissionDto>>;
export declare class UpdateRolePermissionDto extends UpdateRolePermissionDto_base {
}
export declare class RolePermissionFilterDto {
    roleId?: string;
    permissionId?: string;
    startDate?: string;
    endDate?: string;
}
export {};
