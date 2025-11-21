import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogDto, ActivityLogFilterDto } from './dto/activity-log.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('ActivityLogs')
@ApiBearerAuth('JWT-auth')
@Controller('activity-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo log de atividade' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Log criado com sucesso', type: SuccessResponseDto })
  async create(@Body() data: Omit<ActivityLogDto, 'id' | 'createdAt'>) {
    const created = await this.activityLogService.create(data);
    return new SuccessResponseDto('Activity log created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar logs de atividade (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'userId', required: false, type: String, example: 'uuid-user' })
  @ApiQuery({ name: 'adminId', required: false, type: String, example: 'uuid-admin' })
  @ApiQuery({ name: 'action', required: false, type: String, example: 'login' })
  @ApiQuery({ name: 'resourceType', required: false, type: String, example: 'User' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Logs retornados com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: ActivityLogFilterDto) {
    const result = await this.activityLogService.findAll(pagination, filter);
    return new SuccessResponseDto('Activity logs retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um log pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Log encontrado', type: SuccessResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.activityLogService.findOne(id);
    return new SuccessResponseDto('Activity log retrieved successfully', data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um log pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Log atualizado', type: SuccessResponseDto })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<ActivityLogDto, 'id' | 'createdAt'>>,
  ) {
    const updated = await this.activityLogService.update(id, data);
    return new SuccessResponseDto('Activity log updated successfully', updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um log pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Log removido', type: SuccessResponseDto })
  async remove(@Param('id') id: string) {
    await this.activityLogService.remove(id);
    return new SuccessResponseDto('Activity log deleted successfully');
  }
}
