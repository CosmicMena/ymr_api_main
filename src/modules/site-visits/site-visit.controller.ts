import { Controller, Get, Post, Param, Body, Delete, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { SiteVisitService } from './site-visit.service';
import { SiteVisitDto, SiteVisitFilterDto } from './dto/site-visit.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiResponse, ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('SiteVisits')
@ApiBearerAuth('JWT-auth')
@Controller('site-visits')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class SiteVisitController {
  constructor(private readonly service: SiteVisitService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar nova visita ao site' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Visita registrada', type: SuccessResponseDto })
  async create(@Body() data: Omit<SiteVisitDto, 'createdAt'>) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Site visit created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar visitas (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'userId', required: false, type: String, example: 'uuid-user' })
  @ApiQuery({ name: 'sessionId', required: false, type: String, example: 'sess-123' })
  @ApiQuery({ name: 'ipAddress', required: false, type: String, example: '192.168.0.' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Visitas retornadas com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: SiteVisitFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Site visits retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter visita específica' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Visita encontrada', type: SuccessResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return new SuccessResponseDto('Site visit retrieved successfully', data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover visita' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Visita removida', type: SuccessResponseDto })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Site visit deleted successfully');
  }
}
