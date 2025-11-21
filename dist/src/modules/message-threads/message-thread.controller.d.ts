import { MessageThreadService } from './message-thread.service';
import { MessageThreadDto, MessageThreadFilterDto } from './dto/message-thread.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class MessageThreadController {
    private readonly service;
    constructor(service: MessageThreadService);
    create(data: Omit<MessageThreadDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string | null;
        adminId: string | null;
        subject: string;
        priority: string;
    }>>;
    findAll(pagination: PaginationDto, filter: MessageThreadFilterDto): Promise<SuccessResponseDto<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            userId: string | null;
            adminId: string | null;
            subject: string;
            priority: string;
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
        updatedAt: Date;
        status: string;
        userId: string | null;
        adminId: string | null;
        subject: string;
        priority: string;
    }>>;
    update(id: string, data: Partial<Omit<MessageThreadDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SuccessResponseDto<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string | null;
        adminId: string | null;
        subject: string;
        priority: string;
    }>>;
    remove(id: string): Promise<SuccessResponseDto<any>>;
}
