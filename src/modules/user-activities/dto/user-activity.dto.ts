import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class UserActivityDto {
  @ApiProperty({ description: 'ID da atividade', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'ID do usuário', example: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Tipo de atividade', example: 'login' })
  @IsString()
  @MaxLength(50)
  activityType: string;

  @ApiProperty({ description: 'Título', example: 'Login realizado' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ description: 'Descrição', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Ícone', example: 'login', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;

  @ApiProperty({ description: 'Cor', example: '#FF0000', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  color?: string;

  @ApiProperty({ description: 'Metadados (JSON)', required: false })
  @IsOptional()
  metadata?: any;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;
}

export class CreateUserActivityDto extends OmitType(UserActivityDto, ['id', 'createdAt'] as const) {}

export class UpdateUserActivityDto extends PartialType(CreateUserActivityDto) {}

export class UserActivityFilterDto {
  @ApiProperty({ description: 'Filtrar por usuário', required: false, example: 'uuid-user' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Filtrar por tipo de atividade', required: false, example: 'login' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  activityType?: string;

  @ApiProperty({ description: 'Buscar por título (contém)', required: false, example: 'Login' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;

  @ApiProperty({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
