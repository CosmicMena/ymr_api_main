export declare class AccessPermissionDto {
    id: string;
    name: string;
    resource: string;
    action: string;
    description?: string;
    createdAt: string;
}
declare const CreateAccessPermissionDto_base: import("@nestjs/common").Type<Omit<AccessPermissionDto, "id" | "createdAt">>;
export declare class CreateAccessPermissionDto extends CreateAccessPermissionDto_base {
}
declare const UpdateAccessPermissionDto_base: import("@nestjs/common").Type<Partial<CreateAccessPermissionDto>>;
export declare class UpdateAccessPermissionDto extends UpdateAccessPermissionDto_base {
}
export declare class AccessPermissionFilterDto {
    search?: string;
    resource?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
}
export {};
