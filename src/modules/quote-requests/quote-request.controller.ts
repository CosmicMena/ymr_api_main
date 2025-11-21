import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { QuoteRequestService } from './quote-request.service';
import { QuoteRequestDto, QuoteRequestFilterDto } from './dto/quote-request.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiConsumes, ApiProduces, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('QuoteRequests')
@ApiBearerAuth('JWT-auth')
@Controller('quote-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class QuoteRequestController {
  constructor(private readonly service: QuoteRequestService) {}

  @Post()
  @Roles('quoteRequests.create')
  @ApiOperation({ summary: 'Criar nova solicitação de orçamento', description: 'Cria uma nova solicitação de orçamento vinculada ao usuário e status.' })
  @ApiBody({
    type: QuoteRequestDto,
    description: 'Dados da solicitação (exceto id, createdAt, updatedAt)',
    examples: {
      exemplo1: {
        summary: 'Solicitação padrão',
        value: {
          code: 'Q-2024-001',
          userId: 'uuid-do-usuario',
          statusId: 'uuid-do-status',
          totalItems: 3,
          notes: 'Preciso de orçamento de 3 geradores 50kVA'
        }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Solicitação criada com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar solicitações' })
  async create(@Body() data: Omit<QuoteRequestDto, 'id' | 'createdAt' | 'updatedAt'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Quote request created successfully', created);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar solicitações (paginado)', description: 'Retorna solicitações com filtros por usuário, status e data.' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'Q-2024' })
  @ApiQuery({ name: 'userId', required: false, type: String, example: 'uuid-user' })
  @ApiQuery({ name: 'statusId', required: false, type: String, example: 'uuid-status' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista retornada com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: QuoteRequestFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Quote requests retrieved successfully', result);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Obter solicitação de orçamento pelo ID', description: 'Retorna os detalhes de uma solicitação de orçamento pelo ID.' })
  @ApiParam({ name: 'id', description: 'ID da solicitação (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Solicitação encontrada', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Solicitação não encontrada' })
  async findOne(@Param('id') id: string) {
    const entity = await this.service.findOne(id);
    return new SuccessResponseDto('Quote request retrieved successfully', entity);
  }

  @Patch(':id')
  @Roles('quoteRequests.update')
  @ApiOperation({ summary: 'Atualizar solicitação de orçamento pelo ID', description: 'Atualiza dados de uma solicitação existente.' })
  @ApiParam({ name: 'id', description: 'ID da solicitação (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiBody({
    type: QuoteRequestDto,
    description: 'Campos parciais para atualização',
    examples: {
      atualizarStatus: { summary: 'Atualizar status', value: { statusId: 'uuid-novo-status' } },
      atualizarNotas: { summary: 'Atualizar notas', value: { adminNotes: 'Cliente retornará amanhã' } },
      atualizarItens: { summary: 'Atualizar total de itens', value: { totalItems: 5 } }
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Solicitação atualizada com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Solicitação não encontrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar solicitações' })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<QuoteRequestDto, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Quote request updated successfully', updated);
  }

  @Delete(':id')
  @Roles('quoteRequests.delete')
  @ApiOperation({ summary: 'Remover solicitação de orçamento pelo ID', description: 'Remove uma solicitação do sistema.' })
  @ApiParam({ name: 'id', description: 'ID da solicitação (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Solicitação removida com sucesso', type: SuccessResponseDto, schema: { example: { success: true, message: 'Quote request deleted successfully', data: null } } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Solicitação não encontrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover solicitações' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Quote request deleted successfully');
  }
}
