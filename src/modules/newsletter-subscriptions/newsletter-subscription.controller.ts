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
import { NewsletterSubscriptionService } from './newsletter-subscription.service';
import { NewsletterSubscriptionDto, NewsletterSubscriptionFilterDto } from './dto/newsletter-subscription.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('NewsletterSubscriptions')
@ApiBearerAuth('JWT-auth')
@Controller('newsletter-subscriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsletterSubscriptionController {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova inscrição na newsletter' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Inscrição criada com sucesso.', type: SuccessResponseDto })
  async create(
    @Body() data: Omit<NewsletterSubscriptionDto, 'id' | 'subscribedAt' | 'unsubscribedAt'>,
  ) {
    const created = await this.service.create(data);
    return new SuccessResponseDto('Newsletter subscription created successfully', created);
  }

  @Get()
  @ApiOperation({ summary: 'Listar inscrições (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'email', required: false, type: String, example: 'gmail.com' })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean, example: true })
  @ApiQuery({ name: 'interest', required: false, type: String, example: 'novidades' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-08-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-08-31' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista retornada com sucesso', type: SuccessResponseDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filter: NewsletterSubscriptionFilterDto) {
    const result = await this.service.findAll(pagination, filter);
    return new SuccessResponseDto('Newsletter subscriptions retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma inscrição pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Inscrição encontrada', type: SuccessResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return new SuccessResponseDto('Newsletter subscription retrieved successfully', data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma inscrição pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Inscrição atualizada', type: SuccessResponseDto })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<NewsletterSubscriptionDto, 'id' | 'subscribedAt' | 'unsubscribedAt'>>,
  ) {
    const updated = await this.service.update(id, data);
    return new SuccessResponseDto('Newsletter subscription updated successfully', updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma inscrição pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Inscrição removida', type: SuccessResponseDto })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return new SuccessResponseDto('Newsletter subscription deleted successfully');
  }
}
