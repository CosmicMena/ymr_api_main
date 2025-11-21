export declare class MessageThreadDto {
    id: string;
    subject: string;
    userId?: string;
    adminId?: string;
    status: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
}
declare const CreateMessageThreadDto_base: import("@nestjs/common").Type<Omit<MessageThreadDto, "id" | "createdAt" | "updatedAt">>;
export declare class CreateMessageThreadDto extends CreateMessageThreadDto_base {
}
declare const UpdateMessageThreadDto_base: import("@nestjs/common").Type<Partial<CreateMessageThreadDto>>;
export declare class UpdateMessageThreadDto extends UpdateMessageThreadDto_base {
}
export declare class MessageThreadFilterDto {
    search?: string;
    userId?: string;
    adminId?: string;
    status?: string;
    priority?: string;
    startDate?: string;
    endDate?: string;
}
export {};
