import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam, ApiBearerAuth, ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto, OrderFilterDto } from './dto/order.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles('admin', 'manager', 'user')
  @ApiOperation({
    summary: 'Criar um novo pedido',
    description: 'Cria um novo pedido no sistema com validação de dados e relacionamentos'
  })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Dados do pedido a ser criado',
    examples: {
      pedidoVenda: {
        summary: 'Pedido de Venda',
        value: {
          userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
          statusId: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
          serviceType: 'Venda',
          totalAmount: 15000.00,
          currency: 'AOA',
          notes: 'Entrega preferencialmente no período da manhã',
          deliveryAddress: 'Rua da Independência, 123, Apt 45, Luanda, Angola',
          deliveryDate: '2024-09-01'
        }
      },
      pedidoServico: {
        summary: 'Pedido de Serviço',
        value: {
          userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
          statusId: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
          serviceType: 'Serviço',
          totalAmount: 5000.00,
          currency: 'AOA',
          notes: 'Manutenção de equipamento industrial'
        }
      },
      pedidoOrcamento: {
        summary: 'Pedido de Orçamento',
        value: {
          userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
          statusId: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
          serviceType: 'Orçamento',
          totalAmount: 25000.00,
          currency: 'AOA',
          notes: 'Solicitação de orçamento para equipamentos industriais'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Pedido criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        code: { type: 'string', example: 'ORD-2024-001' },
        userId: { type: 'string' },
        totalAmount: { type: 'number' },
        currency: { type: 'string' },
        createdAt: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos ou campos obrigatórios ausentes'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário ou status não encontrado'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para criar pedidos'
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Listar todos os pedidos',
    description: 'Retorna uma lista paginada de pedidos com filtros opcionais'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página (padrão: 1)',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Quantidade de itens por página (padrão: 10, máximo: 100)',
    example: 20
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Termo de busca por código ou notas',
    example: 'ORD-2024'
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    type: String,
    description: 'Filtrar por ID do usuário',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
  })
  @ApiQuery({
    name: 'statusId',
    required: false,
    type: String,
    description: 'Filtrar por ID do status',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481'
  })
  @ApiQuery({
    name: 'serviceType',
    required: false,
    type: String,
    description: 'Filtrar por tipo de serviço',
    example: 'Venda'
  })
  @ApiQuery({
    name: 'minAmount',
    required: false,
    type: Number,
    description: 'Valor mínimo do pedido',
    example: 1000.00
  })
  @ApiQuery({
    name: 'maxAmount',
    required: false,
    type: Number,
    description: 'Valor máximo do pedido',
    example: 50000.00
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Data de início para filtro',
    example: '2024-08-01'
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Data de fim para filtro',
    example: '2024-08-31'
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Campo para ordenação',
    example: 'createdAt'
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    description: 'Ordem da ordenação (asc, desc)',
    example: 'desc'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de pedidos retornada com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              code: { type: 'string' },
              totalAmount: { type: 'number' },
              currency: { type: 'string' },
              serviceType: { type: 'string' },
              createdAt: { type: 'string' }
            }
          }
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para listar pedidos'
  })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: OrderFilterDto
  ) {
    return this.orderService.findAll(paginationDto, filterDto);
  }

  @Get('active')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Listar pedidos ativos',
    description: 'Retorna uma lista dos pedidos mais recentes'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Quantidade de pedidos a retornar (padrão: 50)',
    example: 20
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de pedidos ativos retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          code: { type: 'string' },
          totalAmount: { type: 'number' },
          serviceType: { type: 'string' },
          createdAt: { type: 'string' }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para listar pedidos'
  })
  async findActiveOrders(@Query('limit') limit: number = 50) {
    return this.orderService.findActiveOrders(limit);
  }

  @Get('recent')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Listar pedidos recentes',
    description: 'Retorna uma lista dos pedidos mais recentes'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Quantidade de pedidos a retornar (padrão: 20)',
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de pedidos recentes retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          code: { type: 'string' },
          totalAmount: { type: 'number' },
          serviceType: { type: 'string' },
          createdAt: { type: 'string' }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para listar pedidos'
  })
  async findRecentOrders(@Query('limit') limit: number = 20) {
    return this.orderService.findUrgentOrders(limit);
  }

  @Get('stats')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Obter estatísticas dos pedidos',
    description: 'Retorna estatísticas gerais sobre os pedidos do sistema'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estatísticas retornadas com sucesso',
    schema: {
      type: 'object',
      properties: {
        totalOrders: { type: 'number', example: 1250 },
        ordersThisMonth: { type: 'number', example: 45 },
        totalRevenue: { type: 'number', example: 1500000.00 },
        averageOrderValue: { type: 'number', example: 1200.00 }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para acessar estatísticas'
  })
  async getOrderStats() {
    return this.orderService.getOrderStats();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter pedido por ID',
    description: 'Retorna um pedido específico pelo seu ID único com todos os detalhes'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do pedido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pedido encontrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        code: { type: 'string' },
        totalAmount: { type: 'number' },
        currency: { type: 'string' },
        serviceType: { type: 'string' },
        createdAt: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pedido não encontrado'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Atualizar pedido',
    description: 'Atualiza um pedido existente pelo ID'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do pedido a ser atualizado',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @ApiBody({
    type: UpdateOrderDto,
    description: 'Dados parciais do pedido para atualização',
    examples: {
      atualizacaoStatus: {
        summary: 'Atualização de Status',
        value: {
          statusId: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
          notes: 'Pedido em processamento'
        }
      },
      atualizacaoValor: {
        summary: 'Atualização de Valor',
        value: {
          totalAmount: 18000.00,
          notes: 'Valor atualizado com taxas adicionais'
        }
      },
      atualizacaoEntrega: {
        summary: 'Atualização de Entrega',
        value: {
          deliveryDate: '2024-09-05',
          deliveryAddress: 'Nova Rua da Independência, 456, Luanda'
        }
      },
      atualizacaoNotas: {
        summary: 'Atualização de Notas',
        value: {
          notes: 'Cliente solicitou alteração na data de entrega'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pedido atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        code: { type: 'string' },
        totalAmount: { type: 'number' },
        updatedAt: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pedido não encontrado'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos para atualização'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para atualizar pedidos'
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({
    summary: 'Remover pedido',
    description: 'Remove permanentemente um pedido do sistema'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do pedido a ser removido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pedido removido com sucesso',
    type: SuccessResponseDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pedido não encontrado'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Pedido não pode ser removido (ex: possui itens)'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para remover pedidos'
  })
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
