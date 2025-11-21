import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiHeader,
  ApiConsumes,
  ApiProduces,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AccessPermissionService } from './access-permission.service';
import { AccessPermissionDto, CreateAccessPermissionDto, UpdateAccessPermissionDto, AccessPermissionFilterDto } from './dto/access-permission.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('AccessPermissions')
@ApiBearerAuth('JWT-auth')
@ApiConsumes('application/json')
@ApiProduces('application/json')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('access-permissions')
export class AccessPermissionController {
  constructor(
    private readonly accessPermissionService: AccessPermissionService,
  ) {}

  @ApiOperation({
    summary: 'Criar uma nova permissão de acesso',
    description: 'Cria uma nova permissão de acesso no sistema. Acesso restrito a administradores.',
  })
  @ApiBody({
    type: CreateAccessPermissionDto,
    description: 'Dados da permissão a ser criada',
    examples: {
      example1: {
        summary: 'Permissão de Edição de Produto',
        description: 'Permissão para editar produtos',
        value: {
          name: 'Editar Produto',
          resource: 'Product',
          action: 'edit',
          description: 'Permite editar informações de produtos',
        },
      },
      example2: {
        summary: 'Permissão de Visualização de Usuário',
        description: 'Permissão para visualizar usuários',
        value: {
          name: 'Visualizar Usuário',
          resource: 'User',
          action: 'view',
          description: 'Permite visualizar detalhes dos usuários',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Permissão criada com sucesso',
    type: SuccessResponseDto,
    schema: {
      example: {
        success: true,
        message: 'Access permission created successfully',
        data: {
          id: 'uuid-da-permissao',
          name: 'Editar Produto',
          resource: 'Product',
          action: 'edit',
          description: 'Permite editar informações de produtos',
          createdAt: '2024-08-19T19:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos fornecidos' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para criar permissões' })
  @Roles('access-permissions.create')
  @Post()
  async create(@Body() data: CreateAccessPermissionDto) {
    const permission = await this.accessPermissionService.create(data);
    return new SuccessResponseDto('Access permission created successfully', permission);
  }

  @ApiOperation({
    summary: 'Listar permissões (paginado)',
    description: 'Retorna uma lista de permissões de acesso com filtros.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'Editar' })
  @ApiQuery({ name: 'resource', required: false, type: String, example: 'Product' })
  @ApiQuery({ name: 'action', required: false, type: String, example: 'edit' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permissões recuperadas com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para listar permissões' })
  @Roles('access-permissions.list')
  @Get()
  async findAll(@Query() pagination: PaginationDto, @Query() filter: AccessPermissionFilterDto) {
    const permissions = await this.accessPermissionService.findAll(pagination, filter);
    return new SuccessResponseDto('Access permissions retrieved successfully', permissions);
  }

  @ApiOperation({
    summary: 'Obter uma permissão pelo ID',
    description: 'Retorna detalhes de uma permissão específica pelo seu ID. Acesso restrito a administradores.',
  })
  @ApiParam({ name: 'id', description: 'ID único da permissão (UUID)', example: 'uuid-da-permissao', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Permissão recuperada com sucesso',
    type: SuccessResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Permissão não encontrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para acessar esta permissão' })
  @Roles('access-permissions.view')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const permission = await this.accessPermissionService.findOne(id);
    return new SuccessResponseDto('Access permission retrieved successfully', permission);
  }

  @ApiOperation({
    summary: 'Atualizar uma permissão pelo ID',
    description: 'Atualiza informações de uma permissão existente. Acesso restrito a administradores.',
  })
  @ApiParam({ name: 'id', description: 'ID da permissão (UUID)', example: 'uuid-da-permissao', type: String })
  @ApiBody({
    type: UpdateAccessPermissionDto,
    description: 'Campos a serem atualizados (todos opcionais)',
    examples: {
      example1: { summary: 'Atualizar nome e descrição', value: { name: 'Editar Produto Avançado', description: 'Permissão atualizada para edição avançada de produtos' } },
    },
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permissão atualizada com sucesso', type: SuccessResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Permissão não encontrada' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos fornecidos' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para atualizar permissões' })
  @Roles('access-permissions.update')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateAccessPermissionDto,
  ) {
    const permission = await this.accessPermissionService.update(id, data);
    return new SuccessResponseDto('Access permission updated successfully', permission);
  }

  @ApiOperation({
    summary: 'Remover uma permissão pelo ID',
    description: 'Remove uma permissão do sistema. Acesso restrito a administradores.',
  })
  @ApiParam({ name: 'id', description: 'ID da permissão (UUID)', example: 'uuid-da-permissao', type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permissão excluída com sucesso', type: SuccessResponseDto, schema: { example: { success: true, message: 'Access permission deleted successfully', data: null } } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Permissão não encontrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuário não autenticado' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Usuário sem permissão para excluir permissões' })
  @Roles('access-permissions.delete')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.accessPermissionService.remove(id);
    return new SuccessResponseDto('Access permission deleted successfully');
  }
}
