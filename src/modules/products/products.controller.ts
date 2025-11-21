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
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto, ProductListQueryDto } from './dto/product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Products')
@ApiBearerAuth('JWT-auth')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Criar um novo produto',
    description: 'Cria um novo produto no sistema com validação de dados e relacionamentos'
  })
  @ApiBody({
    type: CreateProductDto,
    description: 'Dados do produto a ser criado',
    examples: {
      produtoEletronico: {
        summary: 'Produto Eletrônico',
        value: {
          code: 'SAMS-GS23-128GB',
          name: 'Smartphone Samsung Galaxy S23',
          model: 'Galaxy S23',
          description: 'Smartphone de última geração com câmera de 108MP',
          price: 2999.99,
          brandId: 'uuid-da-marca-samsung',
          subcategoryId: 'uuid-da-subcategoria-smartphones',
          stockQuantity: 50,
          isActive: true,
          features: ['5G', 'Câmera 108MP', 'Processador Snapdragon'],
          specifications: {
            screen: '6.1" Dynamic AMOLED 2X',
            processor: 'Snapdragon 8 Gen 2',
            ram: '8GB',
            storage: '128GB',
            battery: '3900mAh'
          }
        }
      },
      produtoVestuario: {
        summary: 'Produto de Vestuário',
        value: {
          code: 'VEST-CAM-ALG-M',
          name: 'Camiseta Básica Algodão',
          description: 'Camiseta 100% algodão orgânico, confortável e durável',
          price: 29.99,
          brandId: 'uuid-da-marca-vestuario',
          subcategoryId: 'uuid-da-subcategoria-camisetas',
          stockQuantity: 200,
          isActive: true,
          features: ['100% Algodão', 'Orgânico', 'Confortável'],
          specifications: {
            material: '100% Algodão Orgânico',
            tamanho: 'M',
            cor: 'Branco',
            lavagem: 'Lavar a 30°C'
          }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Produto criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        code: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number' },
        createdAt: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos ou campos obrigatórios ausentes'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Código do produto já existe'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para criar produtos'
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Listar todos os produtos',
    description: 'Retorna uma lista paginada de produtos com filtros opcionais'
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
    description: 'Termo de busca por nome, código, descrição ou modelo',
    example: 'smartphone'
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    description: 'Filtrar por categoria',
    example: 'uuid-da-categoria'
  })
  @ApiQuery({
    name: 'brandId',
    required: false,
    type: String,
    description: 'Filtrar por marca',
    example: 'uuid-da-marca'
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    type: Number,
    description: 'Preço mínimo',
    example: 100
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    type: Number,
    description: 'Preço máximo',
    example: 5000
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: 'Filtrar por status ativo',
    example: true
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Campo para ordenação (name, price, createdAt, updatedAt)',
    example: 'price'
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    description: 'Ordem da ordenação (asc, desc)',
    example: 'asc'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de produtos retornada com sucesso',
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
              name: { type: 'string' },
              price: { type: 'number' },
              isActive: { type: 'boolean' }
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
  async findAll(@Query() query: ProductListQueryDto) {
    const { page, limit, search, sortBy, sortOrder, ...filters } = query;
    return this.productsService.findAll(
      { page, limit, search, sortBy, sortOrder },
      filters as ProductFilterDto,
    );
  }

  @Get('popular')
  @Public()
  @ApiOperation({
    summary: 'Obter produtos populares',
    description: 'Retorna os produtos mais visualizados/populares'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Quantidade de produtos a retornar (padrão: 10)',
    example: 5
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produtos populares retornados com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          code: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'number' },
          viewCount: { type: 'number' }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  async getPopularProducts(@Query('limit') limit: number = 10) {
    return this.productsService.getPopularProducts(limit);
  }

  @Get('featured')
  @Public()
  @ApiOperation({
    summary: 'Obter produtos em destaque',
    description: 'Retorna produtos marcados como em destaque'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Quantidade de produtos a retornar (padrão: 10)',
    example: 8
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produtos em destaque retornados com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          code: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'number' },
          isActive: { type: 'boolean' }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  async getFeaturedProducts(@Query('limit') limit: number = 10) {
    return this.productsService.getFeaturedProducts(limit);
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Obter produto por ID',
    description: 'Retorna um produto específico pelo seu ID único'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do produto',
    example: 'uuid-do-produto'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto encontrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        code: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number' },
        isActive: { type: 'boolean' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produto não encontrado'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Atualizar produto',
    description: 'Atualiza um produto existente pelo ID'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do produto a ser atualizado',
    example: 'uuid-do-produto'
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Dados parciais do produto para atualização',
    examples: {
      atualizacaoPreco: {
        summary: 'Atualização de Preço',
        value: {
          price: 2799.99,
          stockQuantity: 45
        }
      },
      atualizacaoDescricao: {
        summary: 'Atualização de Descrição',
        value: {
          description: 'Smartphone Samsung Galaxy S23 com câmera aprimorada e nova cor',
          specifications: {
            screen: '6.1" Dynamic AMOLED 2X 120Hz',
            processor: 'Snapdragon 8 Gen 2',
            ram: '8GB LPDDR5X',
            storage: '128GB UFS 4.0',
            battery: '3900mAh com carregamento de 25W'
          }
        }
      },
      ativacaoProduto: {
        summary: 'Ativação/Desativação',
        value: {
          isActive: false
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        code: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number' },
        updatedAt: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produto não encontrado'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos para atualização'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Código do produto já existe'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para atualizar produtos'
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({
    summary: 'Remover produto',
    description: 'Remove permanentemente um produto do sistema'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do produto a ser removido',
    example: 'uuid-do-produto'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto removido com sucesso',
    type: SuccessResponseDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produto não encontrado'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Produto não pode ser removido (ex: possui pedidos ativos)'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para remover produtos'
  })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}