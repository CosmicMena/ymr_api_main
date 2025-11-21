import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, MaxLength, IsDateString } from 'class-validator';

// DTO principal (para respostas completas)
export class AccessPermissionDto {
  @ApiProperty({ description: 'ID da permissão', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome da permissão', example: 'Editar Produto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Recurso relacionado à permissão', example: 'Product' })
  @IsString()
  resource: string;

  @ApiProperty({ description: 'Ação permitida', example: 'edit' })
  @IsString()
  action: string;

  @ApiProperty({ description: 'Descrição da permissão', required: false, example: 'Permite editar informações de produtos' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Data de criação da permissão', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;
}

// DTO para criação (omitindo id e createdAt)
export class CreateAccessPermissionDto extends OmitType(AccessPermissionDto, ['id', 'createdAt'] as const) {}

// DTO para atualização (todos os campos opcionais)
export class UpdateAccessPermissionDto extends PartialType(CreateAccessPermissionDto) {}

export class AccessPermissionFilterDto {
  @ApiProperty({ description: 'Buscar por nome (contém)', required: false, example: 'Editar' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiProperty({ description: 'Filtrar por recurso', required: false, example: 'Product' })
  @IsOptional()
  @IsString()
  resource?: string;

  @ApiProperty({ description: 'Filtrar por ação', required: false, example: 'edit' })
  @IsOptional()
  @IsString()
  action?: string;

  @ApiProperty({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
