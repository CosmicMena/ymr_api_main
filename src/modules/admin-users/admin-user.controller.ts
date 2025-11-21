import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { AdminUserDto, AdminUserFilterDto } from './dto/admin-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('AdminUsers')
@ApiBearerAuth('JWT-auth')
@Controller('admin-users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo administrador' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Administrador criado com sucesso.', type: SuccessResponseDto })
  async create(@Body() data: Omit<AdminUserDto, 'id' | 'createdAt' | 'updatedAt'>) {
    const created = await this.adminUserService.create(data);
    return new SuccessResponseDto('Admin user created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar administradores (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'maria' })
  @ApiQuery({ name: 'roleId', required: false, type: String, example: 'uuid-role' })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean, example: true })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista retornada com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: AdminUserFilterDto) {
    const result = await this.adminUserService.findAll(pagination, filter);
    return new SuccessResponseDto('Admin users retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um administrador pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Administrador encontrado', type: SuccessResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.adminUserService.findOne(id);
    return new SuccessResponseDto('Admin user retrieved successfully', data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um administrador pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Administrador atualizado', type: SuccessResponseDto })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<AdminUserDto, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    const updated = await this.adminUserService.update(id, data);
    return new SuccessResponseDto('Admin user updated successfully', updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um administrador pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Administrador removido', type: SuccessResponseDto })
  async remove(@Param('id') id: string) {
    await this.adminUserService.remove(id);
    return new SuccessResponseDto('Admin user deleted successfully');
  }
}
