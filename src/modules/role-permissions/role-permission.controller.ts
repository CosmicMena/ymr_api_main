import { Controller, Get, Post, Param, Body, Delete, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionDto, RolePermissionFilterDto } from './dto/role-permission.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('RolePermissions')
@ApiBearerAuth('JWT-auth')
@Controller('role-permissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolePermissionController {
  constructor(private readonly service: RolePermissionService) {}

  @Post()
  @ApiOperation({ summary: 'Conceder permissão a um papel' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Concedida com sucesso', type: SuccessResponseDto })
  async create(@Body() data: Omit<RolePermissionDto, 'grantedAt'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Role permission created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar permissões de papéis (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'roleId', required: false, type: String, example: 'uuid-role' })
  @ApiQuery({ name: 'permissionId', required: false, type: String, example: 'uuid-permission' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista retornada', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: RolePermissionFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Role permissions retrieved successfully', result);
  }

  @Get(':roleId/:permissionId')
  @ApiOperation({ summary: 'Obter permissão específica de um papel' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro encontrado', type: SuccessResponseDto })
  async findOne(@Param('roleId') roleId: string, @Param('permissionId') permissionId: string) {
    const data = await this.service.findOne(roleId, permissionId);
    return new SuccessResponseDto('Role permission retrieved successfully', data);
  }

  @Delete(':roleId/:permissionId')
  @ApiOperation({ summary: 'Revogar permissão de um papel' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro removido', type: SuccessResponseDto })
  async remove(@Param('roleId') roleId: string, @Param('permissionId') permissionId: string) {
    await this.service.remove(roleId, permissionId);
    return new SuccessResponseDto('Role permission deleted successfully');
  }
}
