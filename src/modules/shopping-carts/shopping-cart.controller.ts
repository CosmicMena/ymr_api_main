import { Controller, Get, Post, Param, Body, Delete, Patch, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartDto, ShoppingCartFilterDto } from './dto/shopping-cart.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiResponse, ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('ShoppingCarts')
@ApiBearerAuth('JWT-auth')
@Controller('shopping-carts')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class ShoppingCartController {
  constructor(private readonly service: ShoppingCartService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar item ao carrinho' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Item adicionado', type: SuccessResponseDto })
  async create(@Body() data: Omit<ShoppingCartDto, 'createdAt' | 'updatedAt'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Cart item created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar itens do carrinho (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'userId', required: false, type: String, example: 'uuid-user' })
  @ApiQuery({ name: 'sessionId', required: false, type: String, example: 'sess-123' })
  @ApiQuery({ name: 'productId', required: false, type: String, example: 'uuid-product' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Itens retornados com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: ShoppingCartFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Cart items retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter item específico do carrinho' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item encontrado', type: SuccessResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return new SuccessResponseDto('Cart item retrieved successfully', data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar item do carrinho' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item atualizado', type: SuccessResponseDto })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<ShoppingCartDto, 'id' | 'createdAt' | 'updatedAt'>>
  ) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Cart item updated successfully', updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover item do carrinho' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item removido', type: SuccessResponseDto })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Cart item deleted successfully');
  }
}
