import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivityDto } from './dto/user-activity.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('UserActivities')
@ApiBearerAuth('JWT-auth')
@Controller('user-activities')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserActivityController {
  constructor(private readonly service: UserActivityService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova atividade de usuário' })
  async create(@Body() data: Omit<UserActivityDto, 'id'>) {
    return this.service.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as atividades' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter atividade específica' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar atividade' })
  async update(@Param('id') id: string, @Body() data: Partial<Omit<UserActivityDto, 'id'>>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover atividade' })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
