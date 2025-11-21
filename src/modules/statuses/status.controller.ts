import { Controller, Get, Post, Param, Body, Patch, Delete, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusDto, StatusFilterDto } from './dto/status.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('Statuses')
@ApiBearerAuth('JWT-auth')
@Controller('statuses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StatusController {
  constructor(private readonly service: StatusService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo status' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Status criado', type: SuccessResponseDto })
  async create(@Body() data: Omit<StatusDto, 'id'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Status created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar status (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'pend' })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean, example: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Status retornados', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: StatusFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Statuses retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter status específico' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Status encontrado', type: SuccessResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return new SuccessResponseDto('Status retrieved successfully', data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Status atualizado', type: SuccessResponseDto })
  async update(@Param('id') id: string, @Body() data: Partial<Omit<StatusDto, 'id'>>) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Status updated successfully', updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Status removido', type: SuccessResponseDto })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Status deleted successfully');
  }
}
