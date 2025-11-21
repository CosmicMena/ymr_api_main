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
import { QuoteItemService } from './quote-item.service';
import { QuoteItemDto, QuoteItemFilterDto } from './dto/quote-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiConsumes, ApiProduces, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('QuoteItems')
@ApiBearerAuth('JWT-auth')
@Controller('quote-items')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class QuoteItemController {
  constructor(private readonly service: QuoteItemService) {}

  @Post()
  @Roles('quoteItems.create')
  @ApiOperation({ summary: 'Criar novo item de orçamento', description: 'Cria um item vinculado a uma solicitação de orçamento e produto.' })
  @ApiBody({
    type: QuoteItemDto,
    description: 'Dados do item do orçamento (exceto id, createdAt)',
    examples: {
      itemPadrao: {
        summary: 'Item padrão',
        value: { quoteRequestId: 'uuid-solicitacao', productId: 'uuid-produto', quantity: 2, unitPrice: 2500.00, totalPrice: 5000.00, notes: 'Urgente' }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Item criado com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar itens' })
  async create(@Body() data: Omit<QuoteItemDto, 'id' | 'createdAt'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Quote item created successfully', created);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar itens de orçamento (paginado)', description: 'Retorna itens com filtros por solicitação, produto e período.' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'quoteRequestId', required: false, type: String, example: 'uuid-qr' })
  @ApiQuery({ name: 'productId', required: false, type: String, example: 'uuid-product' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Itens retornados com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: QuoteItemFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Quote items retrieved successfully', result);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Obter item de orçamento pelo ID', description: 'Retorna os detalhes de um item de orçamento pelo ID.' })
  @ApiParam({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item encontrado', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item não encontrado' })
  async findOne(@Param('id') id: string) {
    const entity = await this.service.findOne(id);
    return new SuccessResponseDto('Quote item retrieved successfully', entity);
  }

  @Patch(':id')
  @Roles('quoteItems.update')
  @ApiOperation({ summary: 'Atualizar item de orçamento pelo ID', description: 'Atualiza campos parciais de um item de orçamento.' })
  @ApiParam({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiBody({
    type: QuoteItemDto,
    description: 'Campos para atualização',
    examples: {
      atualizarQtd: { summary: 'Atualizar quantidade', value: { quantity: 3, totalPrice: 7500.00 } },
      atualizarNotas: { summary: 'Atualizar notas', value: { notes: 'Priorizar entrega' } }
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item atualizado com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item não encontrado' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar itens' })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<QuoteItemDto, 'id' | 'createdAt'>>,
  ) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Quote item updated successfully', updated);
  }

  @Delete(':id')
  @Roles('quoteItems.delete')
  @ApiOperation({ summary: 'Remover item de orçamento pelo ID', description: 'Remove um item de orçamento pelo seu ID.' })
  @ApiParam({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item removido com sucesso', type: SuccessResponseDto, schema: { example: { success: true, message: 'Quote item deleted successfully', data: null } } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item não encontrado' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover itens' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Quote item deleted successfully');
  }
}
