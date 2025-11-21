import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto, MessageFilterDto } from './dto/message.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiConsumes, ApiProduces, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Messages')
@ApiBearerAuth('JWT-auth')
@Controller('messages')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post()
  @Roles('messages.create')
  @ApiOperation({ summary: 'Criar nova mensagem', description: 'Cria uma mensagem em um tópico de mensagens.' })
  @ApiBody({
    type: MessageDto,
    description: 'Dados da mensagem (exceto id, createdAt)',
    examples: {
      exemplo1: {
        summary: 'Mensagem de usuário',
        value: { threadId: 'uuid-thread', senderType: 'user', senderId: 'uuid-user', content: 'Olá, gostaria de um orçamento...', isRead: false }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Mensagem criada com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar mensagens' })
  async create(@Body() data: Omit<MessageDto, 'id' | 'createdAt'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Message created successfully', created);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar mensagens (paginado)', description: 'Retorna mensagens com filtros por tópico, remetente, não lidas e período.' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'threadId', required: false, type: String, example: 'uuid-thread' })
  @ApiQuery({ name: 'senderId', required: false, type: String, example: 'uuid-user' })
  @ApiQuery({ name: 'isUnread', required: false, type: Boolean, example: true })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mensagens retornadas com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: MessageFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Messages retrieved successfully', result);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Obter uma mensagem pelo ID', description: 'Retorna detalhes de uma mensagem pelo ID.' })
  @ApiParam({ name: 'id', description: 'ID da mensagem (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mensagem encontrada', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mensagem não encontrada' })
  async findOne(@Param('id') id: string) {
    const entity = await this.service.findOne(id);
    return new SuccessResponseDto('Message retrieved successfully', entity);
  }

  @Patch(':id')
  @Roles('messages.update')
  @ApiOperation({ summary: 'Atualizar uma mensagem pelo ID', description: 'Atualiza conteúdo ou status de leitura.' })
  @ApiParam({ name: 'id', description: 'ID da mensagem (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiBody({
    type: MessageDto,
    description: 'Campos parciais para atualização',
    examples: {
      marcarLida: { summary: 'Marcar como lida', value: { isRead: true } },
      editarConteudo: { summary: 'Editar conteúdo', value: { content: 'Conteúdo atualizado' } }
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mensagem atualizada com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mensagem não encontrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar mensagens' })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<MessageDto, 'id' | 'createdAt'>>,
  ) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Message updated successfully', updated);
  }

  @Delete(':id')
  @Roles('messages.delete')
  @ApiOperation({ summary: 'Remover uma mensagem pelo ID', description: 'Remove uma mensagem pelo seu ID.' })
  @ApiParam({ name: 'id', description: 'ID da mensagem (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mensagem removida com sucesso', type: SuccessResponseDto, schema: { example: { success: true, message: 'Message deleted successfully', data: null } } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mensagem não encontrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover mensagens' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Message deleted successfully');
  }
}
