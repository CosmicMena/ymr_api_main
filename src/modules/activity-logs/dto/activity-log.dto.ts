import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsDateString, MaxLength } from 'class-validator';

export class ActivityLogDto {
  @ApiProperty({ description: 'ID do log', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'ID do usuário', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'ID do admin', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  adminId?: string;

  @ApiProperty({ description: 'Ação', example: 'login' })
  @IsString()
  @MaxLength(100)
  action: string;

  @ApiProperty({ description: 'Descrição', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Tipo de recurso', example: 'User', required: false })
  @IsOptional()
  @IsString()
  resourceType?: string;

  @ApiProperty({ description: 'ID do recurso', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  resourceId?: string;

  @ApiProperty({ description: 'Endereço IP', example: '192.168.0.1', required: false })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty({ description: 'User Agent', required: false })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty({ description: 'Metadados (JSON)', required: false })
  @IsOptional()
  metadata?: any;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;
}

export class CreateActivityLogDto extends OmitType(ActivityLogDto, ['id', 'createdAt'] as const) {}

export class UpdateActivityLogDto extends PartialType(CreateActivityLogDto) {}

export class ActivityLogFilterDto {
  @ApiProperty({ description: 'Filtrar por usuário', required: false, example: 'uuid-user' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Filtrar por admin', required: false, example: 'uuid-admin' })
  @IsOptional()
  @IsUUID()
  adminId?: string;

  @ApiProperty({ description: 'Filtrar por ação', required: false, example: 'login' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  action?: string;

  @ApiProperty({ description: 'Filtrar por tipo de recurso', required: false, example: 'User' })
  @IsOptional()
  @IsString()
  resourceType?: string;

  @ApiProperty({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
