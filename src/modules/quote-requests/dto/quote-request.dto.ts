import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsInt, IsDateString, MaxLength } from 'class-validator';

export class QuoteRequestDto {
  @ApiProperty({ description: 'ID da solicitação de orçamento', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Código da solicitação', example: 'Q-2024-001' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'ID do usuário', example: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'ID do status', example: 'uuid' })
  @IsUUID()
  statusId: string;

  @ApiProperty({ description: 'Total de itens', example: 3 })
  @IsInt()
  totalItems: number;

  @ApiProperty({ description: 'Notas do usuário', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Notas do admin', required: false })
  @IsOptional()
  @IsString()
  adminNotes?: string;

  @ApiProperty({ description: 'Data de expiração', example: '2024-09-01T00:00:00.000Z', required: false })
  @IsOptional()
  @IsString()
  expiresAt?: string;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;

  @ApiProperty({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  updatedAt: string;
}

export class CreateQuoteRequestDto extends OmitType(QuoteRequestDto, ['id', 'code', 'createdAt', 'updatedAt'] as const) {}

export class UpdateQuoteRequestDto extends PartialType(CreateQuoteRequestDto) {}

export class QuoteRequestFilterDto {
  @ApiProperty({ description: 'Buscar por código (contém)', required: false, example: 'Q-2024' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  search?: string;

  @ApiProperty({ description: 'Filtrar por usuário', required: false, example: 'uuid-usuario' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Filtrar por status', required: false, example: 'uuid-status' })
  @IsOptional()
  @IsUUID()
  statusId?: string;

  @ApiProperty({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
