import { MessageService } from './message.service';
import { MessageDto, MessageFilterDto } from './dto/message.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class MessageController {
    private readonly service;
    constructor(service: MessageService);
    create(data: Omit<MessageDto, 'id' | 'createdAt'>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        content: string;
        threadId: string;
        senderType: string;
        senderId: string;
        attachments: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>>;
    findAll(pagination: PaginationDto, filter: MessageFilterDto): Promise<SuccessResponseDto<{
        data: {
            id: string;
            createdAt: Date;
            content: string;
            threadId: string;
            senderType: string;
            senderId: string;
            attachments: import("@prisma/client/runtime/library").JsonValue | null;
            isRead: boolean;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>>;
    findOne(id: string): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        content: string;
        threadId: string;
        senderType: string;
        senderId: string;
        attachments: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>>;
    update(id: string, data: Partial<Omit<MessageDto, 'id' | 'createdAt'>>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        content: string;
        threadId: string;
        senderType: string;
        senderId: string;
        attachments: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
