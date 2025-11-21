import { Controller, Get, Post, Param, Body, Patch, Delete, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryDto, SubcategoryFilterDto, SubcategoryListQueryDto } from './dto/subcategory.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiBody, ApiConsumes, ApiProduces, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Subcategories')
@ApiBearerAuth('JWT-auth')
@Controller('subcategories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class SubcategoryController {
  constructor(private readonly service: SubcategoryService) {}

  @Post()
  @Roles('subcategories.create')
  @ApiOperation({ summary: 'Criar nova subcategoria', description: 'Cria uma nova subcategoria vinculada a uma categoria existente.' })
  @ApiBody({
    type: SubcategoryDto,
    description: 'Dados da subcategoria a ser criada (exceto id, createdAt, updatedAt)',
    examples: {
      exemplo1: {
        summary: 'Subcategoria de Geradores',
        value: {
          name: 'Geradores Industriais',
          categoryId: 'uuid-da-categoria',
          isActive: true
        }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Subcategoria criada com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos fornecidos' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar subcategorias' })
  async create(@Body() data: Omit<SubcategoryDto, 'id'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Subcategory created successfully', created);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar subcategorias (paginado)', description: 'Retorna subcategorias com filtros por nome, categoria e ativo.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista retornada com sucesso', type: SuccessResponseDto })
  async findAll(@Query() query: SubcategoryListQueryDto) {
    const { page, limit, search, isActive, categoryId } = query;
    const result = await this.service.findAll({ page, limit, search }, { isActive, categoryId, search });
    return new SuccessResponseDto('Subcategories retrieved successfully', result);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Obter subcategoria específica', description: 'Retorna os detalhes de uma subcategoria pelo ID.' })
  @ApiParam({ name: 'id', description: 'ID da subcategoria (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Subcategoria encontrada', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Subcategoria não encontrada' })
  async findOne(@Param('id') id: string) {
    const entity = await this.service.findOne(id);
    return new SuccessResponseDto('Subcategory retrieved successfully', entity);
  }

  @Patch(':id')
  @Roles('subcategories.update')
  @ApiOperation({ summary: 'Atualizar subcategoria', description: 'Atualiza dados de uma subcategoria existente.' })
  @ApiParam({ name: 'id', description: 'ID da subcategoria (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiBody({
    type: SubcategoryDto,
    description: 'Campos parciais para atualização',
    examples: {
      atualizarNome: { summary: 'Atualizar nome', value: { name: 'Geradores de Backup' } },
      ativarDesativar: { summary: 'Ativar/Desativar', value: { isActive: false } }
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Subcategoria atualizada', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Subcategoria não encontrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar subcategorias' })
  async update(@Param('id') id: string, @Body() data: Partial<Omit<SubcategoryDto, 'id'>>) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Subcategory updated successfully', updated);
  }

  @Delete(':id')
  @Roles('subcategories.delete')
  @ApiOperation({ summary: 'Remover subcategoria', description: 'Remove uma subcategoria pelo ID.' })
  @ApiParam({ name: 'id', description: 'ID da subcategoria (UUID)', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Subcategoria removida com sucesso', type: SuccessResponseDto, schema: { example: { success: true, message: 'Subcategory deleted successfully', data: null } } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Subcategoria não encontrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para remover subcategorias' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Subcategory deleted successfully');
  }
}
