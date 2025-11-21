import { PrismaService } from '../../common/prisma/prisma.service';
import { MessageDto } from './dto/message.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { MessageFilterDto } from './dto/message.dto';
export declare class MessageService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<MessageDto, 'id' | 'createdAt'>): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        threadId: string;
        senderType: string;
        senderId: string;
        attachments: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    findAll(paginationDto: PaginationDto, filterDto: MessageFilterDto): Promise<{
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
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        threadId: string;
        senderType: string;
        senderId: string;
        attachments: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    update(id: string, data: Partial<Omit<MessageDto, 'id' | 'createdAt'>>): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        threadId: string;
        senderType: string;
        senderId: string;
        attachments: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        threadId: string;
        senderType: string;
        senderId: string;
        attachments: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
}
