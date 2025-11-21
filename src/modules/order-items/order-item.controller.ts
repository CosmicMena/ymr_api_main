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
import { OrderItemService } from './order-item.service';
import { OrderItemDto, OrderItemFilterDto } from './dto/order-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiConsumes, ApiProduces, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('OrderItems')
@ApiBearerAuth('JWT-auth')
@Controller('order-items')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class OrderItemController {
  constructor(private readonly service: OrderItemService) {}

  @Post()
  @Roles('orderItems.create')
  @ApiOperation({ summary: 'Criar novo item de pedido', description: 'Cria um item de pedido vinculado a um pedido e opcionalmente a um produto.' })
  @ApiBody({
    type: OrderItemDto,
    description: 'Dados do item do pedido (exceto id, createdAt)',
    examples: {
      produto: {
        summary: 'Item com produto',
        value: { orderId: 'uuid-pedido', productId: 'uuid-produto', quantity: 2, unitPrice: 1500.00, totalPrice: 3000.00 }
      },
      servico: {
        summary: 'Item de serviço',
        value: { orderId: 'uuid-pedido', serviceDescription: 'Instalação em campo', quantity: 1, unitPrice: 5000.00, totalPrice: 5000.00 }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Item criado com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar itens' })
  async create(@Body() data: Omit<OrderItemDto, 'id' | 'createdAt'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Order item created successfully', created);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar itens de pedidos (paginado)', description: 'Retorna os itens de pedido com filtros por pedido/produto e período.' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'orderId', required: false, type: String, example: 'uuid-order' })
  @ApiQuery({ name: 'productId', required: false, type: String, example: 'uuid-product' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Itens retornados com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: OrderItemFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Order items retrieved successfully', result);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Obter um item pelo ID', description: 'Retorna os detalhes de um item do pedido pelo seu ID.' })
  @ApiParam({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item encontrado', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item não encontrado' })
  async findOne(@Param('id') id: string) {
    const entity = await this.service.findOne(id);
    return new SuccessResponseDto('Order item retrieved successfully', entity);
  }

  @Patch(':id')
  @Roles('orderItems.update')
  @ApiOperation({ summary: 'Atualizar um item pelo ID', description: 'Atualiza campos parciais de um item do pedido.' })
  @ApiParam({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiBody({
    type: OrderItemDto,
    description: 'Campos para atualização',
    examples: {
      atualizarQtd: { summary: 'Atualizar quantidade', value: { quantity: 3, totalPrice: 4500.00 } },
      atualizarServico: { summary: 'Atualizar descrição do serviço', value: { serviceDescription: 'Instalação premium em campo' } }
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item atualizado com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item não encontrado' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar itens' })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<OrderItemDto, 'id' | 'createdAt'>>,
  ) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Order item updated successfully', updated);
  }

  @Delete(':id')
  @Roles('orderItems.delete')
  @ApiOperation({ summary: 'Remover um item pelo ID', description: 'Remove um item de pedido pelo seu ID.' })
  @ApiParam({ name: 'id', description: 'ID do item (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item removido com sucesso', type: SuccessResponseDto, schema: { example: { success: true, message: 'Order item deleted successfully', data: null } } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item não encontrado' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover itens' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Order item deleted successfully');
  }
}
