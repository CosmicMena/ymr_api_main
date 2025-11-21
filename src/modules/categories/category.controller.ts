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
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, CategoryFilterDto } from './dto/category.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Categories')
@ApiBearerAuth('JWT-auth')
@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Criar uma nova categoria',
    description: 'Cria uma nova categoria no sistema com validação de dados'
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'Dados da categoria a ser criada',
    examples: {
      categoriaEletronicos: {
        summary: 'Categoria Eletrônicos',
        value: {
          name: 'Eletrônicos',
          description: 'Produtos eletrônicos e tecnológicos de última geração',
          imageUrl: 'https://exemplo.com/images/eletronicos.jpg',
          isActive: true
        }
      },
      categoriaVestuario: {
        summary: 'Categoria Vestuário',
        value: {
          name: 'Vestuário',
          description: 'Roupas, calçados e acessórios para todas as idades',
          imageUrl: 'https://exemplo.com/images/vestuario.jpg',
          isActive: true
        }
      },
      categoriaCasa: {
        summary: 'Categoria Casa e Jardim',
        value: {
          name: 'Casa e Jardim',
          description: 'Produtos para decoração, organização e jardinagem',
          isActive: true
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Categoria criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        imageUrl: { type: 'string' },
        isActive: { type: 'boolean' },
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
    description: 'Nome da categoria já existe'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para criar categorias'
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Listar todas as categorias',
    description: 'Retorna uma lista de todas as categorias do sistema'
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: 'Filtrar por status ativo',
    example: true
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Termo de busca por nome ou descrição',
    example: 'eletrônicos'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de categorias retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          imageUrl: { type: 'string' },
          isActive: { type: 'boolean' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  async findAll(@Query() filterDto: CategoryFilterDto) {
    if (filterDto.isActive !== undefined) {
      return this.categoryService.findActiveCategories();
    }
    return this.categoryService.findAll();
  }

  @Get('active')
  @Public()
  @ApiOperation({
    summary: 'Listar categorias ativas',
    description: 'Retorna apenas as categorias ativas ordenadas por nome'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categorias ativas retornadas com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          imageUrl: { type: 'string' },
          isActive: { type: 'boolean' }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  async findActiveCategories() {
    return this.categoryService.findActiveCategories();
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Obter categoria por ID',
    description: 'Retorna uma categoria específica pelo seu ID único'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único da categoria',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categoria encontrada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        imageUrl: { type: 'string' },
        isActive: { type: 'boolean' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria não encontrada'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Atualizar categoria',
    description: 'Atualiza uma categoria existente pelo ID'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único da categoria a ser atualizada',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @ApiBody({
    type: UpdateCategoryDto,
    description: 'Dados parciais da categoria para atualização',
    examples: {
      atualizacaoNome: {
        summary: 'Atualização de Nome',
        value: {
          name: 'Eletrônicos Avançados',
          description: 'Produtos eletrônicos de última geração e inovação'
        }
      },
      atualizacaoImagem: {
        summary: 'Atualização de Imagem',
        value: {
          imageUrl: 'https://exemplo.com/images/nova-categoria.jpg'
        }
      },
      ativacaoCategoria: {
        summary: 'Ativação/Desativação',
        value: {
          isActive: false
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categoria atualizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        imageUrl: { type: 'string' },
        isActive: { type: 'boolean' },
        updatedAt: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria não encontrada'
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
    description: 'Usuário sem permissão para atualizar categorias'
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({
    summary: 'Remover categoria',
    description: 'Remove permanentemente uma categoria do sistema'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único da categoria a ser removida',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categoria removida com sucesso',
    type: SuccessResponseDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria não encontrada'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Categoria não pode ser removida (ex: possui produtos vinculados)'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para remover categorias'
  })
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}