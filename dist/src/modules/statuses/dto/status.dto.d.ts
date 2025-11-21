export declare class StatusDto {
    id: string;
    name: string;
    description?: string;
    color?: string;
    isActive: boolean;
}
declare const CreateStatusDto_base: import("@nestjs/common").Type<Omit<StatusDto, "id">>;
export declare class CreateStatusDto extends CreateStatusDto_base {
}
declare const UpdateStatusDto_base: import("@nestjs/common").Type<Partial<CreateStatusDto>>;
export declare class UpdateStatusDto extends UpdateStatusDto_base {
}
export declare class StatusFilterDto {
    search?: string;
    isActive?: boolean;
}
export {};
