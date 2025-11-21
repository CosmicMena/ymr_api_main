import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserRolesService } from './user-roles.service';
import { UserRoleDto, UserRoleFilterDto } from './dto/user-role.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('UserRoles')
@ApiBearerAuth('JWT-auth')
@Controller('user-roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserRolesController {
  constructor(private readonly service: UserRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar papel de usuário' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Papel criado', type: SuccessResponseDto })
  async create(@Body() data: Omit<UserRoleDto, 'id'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('User role created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar papéis (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'name', required: false, type: String, example: 'admin' })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean, example: true })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista retornada', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: UserRoleFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('User roles retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter papel por ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Papel encontrado', type: SuccessResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return new SuccessResponseDto('User role retrieved successfully', data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar papel de usuário' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Papel atualizado', type: SuccessResponseDto })
  async update(@Param('id') id: string, @Body() data: Partial<Omit<UserRoleDto, 'id'>>) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('User role updated successfully', updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover papel de usuário' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Papel removido', type: SuccessResponseDto })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('User role deleted successfully');
  }
}
