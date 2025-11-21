import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { MessageThreadService } from './message-thread.service';
import { MessageThreadDto, MessageThreadFilterDto } from './dto/message-thread.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('MessageThreads')
@ApiBearerAuth('JWT-auth')
@Controller('message-threads')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class MessageThreadController {
  constructor(private readonly service: MessageThreadService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo thread de mensagem' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Thread criado com sucesso.', type: SuccessResponseDto })
  async create(@Body() data: Omit<MessageThreadDto, 'id' | 'createdAt' | 'updatedAt'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Message thread created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar threads (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'produto' })
  @ApiQuery({ name: 'userId', required: false, type: String, example: 'uuid-user' })
  @ApiQuery({ name: 'adminId', required: false, type: String, example: 'uuid-admin' })
  @ApiQuery({ name: 'status', required: false, type: String, example: 'open' })
  @ApiQuery({ name: 'priority', required: false, type: String, example: 'high' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Threads retornados com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: MessageThreadFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Message threads retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um thread pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Thread encontrado', type: SuccessResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return new SuccessResponseDto('Message thread retrieved successfully', data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um thread pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Thread atualizado', type: SuccessResponseDto })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<MessageThreadDto, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Message thread updated successfully', updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um thread pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Thread removido', type: SuccessResponseDto })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Message thread deleted successfully');
  }
}
