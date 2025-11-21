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
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiParam,
  ApiBody,
  ApiHeader,
  ApiConsumes,
  ApiProduces,
  ApiQuery,
} from '@nestjs/swagger';
import { BrandService } from './brands.service';
import { BrandDto, BrandFilterDto } from './dto/brand.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Brands')
@ApiBearerAuth('JWT-auth')
@Controller('brands')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ 
    summary: 'Criar nova marca',
    description: 'Cria uma nova marca de produtos no sistema. Acesso restrito a administradores.'
  })
  @ApiBody({ 
    type: BrandDto,
    description: 'Dados da marca a ser criada',
    examples: {
      example1: {
        summary: 'Marca Industrial',
        description: 'Exemplo de criação de uma marca industrial',
        value: {
          name: 'YMR Industrial',
          description: 'Marca líder em equipamentos industriais de alta qualidade',
          logoUrl: 'https://example.com/logo-ymr.png',
          isActive: true
        }
      },
      example2: {
        summary: 'Marca Residencial',
        description: 'Exemplo de criação de uma marca residencial',
        value: {
          name: 'HomeTech',
          description: 'Marca especializada em equipamentos residenciais inteligentes',
          logoUrl: 'https://example.com/logo-hometech.png',
          isActive: true
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Marca criada com sucesso', 
    type: SuccessResponseDto,
    schema: {
      example: {
        success: true,
        message: 'Brand created successfully',
        data: {
          id: 'uuid-da-marca',
          name: 'YMR Industrial',
          createdAt: '2024-01-15T10:30:00Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Nome da marca já existe no sistema'
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Dados inválidos fornecidos'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Usuário não autenticado'
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Usuário sem permissão para criar marcas'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token JWT',
    required: true
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @Roles('brands.create')
  @Post()
  async create(@Body() createBrandDto: Omit<BrandDto, 'id' | 'createdAt' | 'updatedAt'>) {
    const brand = await this.brandService.create(createBrandDto);
    return new SuccessResponseDto('Brand created successfully', brand);
  }

  @ApiOperation({ 
    summary: 'Listar marcas (paginado)',
    description: 'Retorna lista paginada de marcas com filtros opcionais.'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'cat' })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean, example: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Marcas recuperadas com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Erro na requisição' })
  @ApiProduces('application/json')
  @Public()
  @Get()
  async findAll(@Query() pagination: PaginationDto, @Query() filter: BrandFilterDto) {
    const result = await this.brandService.findAll(pagination, filter);
    return new SuccessResponseDto('Brands retrieved successfully', result);
  }

  @ApiOperation({ 
    summary: 'Buscar marca por ID',
    description: 'Retorna informações detalhadas de uma marca específica pelo seu ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da marca (UUID)',
    example: 'uuid-da-marca',
    type: String
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Marca recuperada com sucesso',
    type: SuccessResponseDto,
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Marca não encontrada'
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'ID inválido fornecido'
  })
  @ApiProduces('application/json')
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const brand = await this.brandService.findOne(id);
    return new SuccessResponseDto('Brand retrieved successfully', brand);
  }

  @ApiOperation({ 
    summary: 'Atualizar marca',
    description: 'Atualiza as informações de uma marca existente. Acesso restrito a administradores.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da marca a ser atualizada (UUID)',
    example: 'uuid-da-marca',
    type: String
  })
  @ApiBody({ 
    type: BrandDto,
    description: 'Dados da marca a serem atualizados (todos os campos são opcionais)',
    examples: {
      example1: {
        summary: 'Atualizar nome e descrição',
        description: 'Exemplo de atualização de nome e descrição',
        value: {
          name: 'YMR Industrial Solutions',
          description: 'Marca líder em soluções industriais de alta tecnologia'
        }
      },
      example2: {
        summary: 'Atualizar logo e status',
        description: 'Exemplo de atualização de logo e status',
        value: {
          logoUrl: 'https://example.com/new-logo-ymr.png',
          isActive: false
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Marca atualizada com sucesso',
    type: SuccessResponseDto,
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Marca não encontrada'
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Dados inválidos fornecidos'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Usuário não autenticado'
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Usuário sem permissão para atualizar marcas'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token JWT',
    required: true
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @Roles('brands.update')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBrandDto: Partial<Omit<BrandDto, 'id' | 'createdAt' | 'updatedAt'>>) {
    const brand = await this.brandService.update(id, updateBrandDto);
    return new SuccessResponseDto('Brand updated successfully', brand);
  }

  @ApiOperation({ 
    summary: 'Excluir marca',
    description: 'Remove uma marca do sistema. Acesso restrito a administradores.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da marca a ser excluída (UUID)',
    example: 'uuid-da-marca',
    type: String
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Marca excluída com sucesso',
    type: SuccessResponseDto,
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Marca não encontrada'
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Não é possível excluir marca com produtos associados'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Usuário não autenticado'
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Usuário sem permissão para excluir marcas'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token JWT',
    required: true
  })
  @ApiProduces('application/json')
  @Roles('brands.delete')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.brandService.remove(id);
    return new SuccessResponseDto('Brand deleted successfully');
  }
}
