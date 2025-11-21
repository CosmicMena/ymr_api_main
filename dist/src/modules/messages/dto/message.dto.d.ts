export declare class MessageDto {
    id: string;
    threadId: string;
    senderType: string;
    senderId: string;
    content: string;
    attachments?: any;
    isRead: boolean;
    createdAt: string;
}
declare const CreateMessageDto_base: import("@nestjs/common").Type<Omit<MessageDto, "id" | "createdAt">>;
export declare class CreateMessageDto extends CreateMessageDto_base {
}
declare const UpdateMessageDto_base: import("@nestjs/common").Type<Partial<CreateMessageDto>>;
export declare class UpdateMessageDto extends UpdateMessageDto_base {
}
export declare class MessageFilterDto {
    threadId?: string;
    senderId?: string;
    isUnread?: boolean;
    startDate?: string;
    endDate?: string;
}
export {};
