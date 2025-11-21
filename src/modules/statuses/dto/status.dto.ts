import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUUID, MaxLength } from 'class-validator';

export class StatusDto {
  @ApiProperty({ description: 'ID do status', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do status', example: 'Pendente' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição do status', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Cor do status (hex)', example: '#FF0000', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ description: 'Status ativo?', example: true, default: true })
  @IsBoolean()
  isActive: boolean;
}

export class CreateStatusDto extends OmitType(StatusDto, ['id'] as const) {}

export class UpdateStatusDto extends PartialType(CreateStatusDto) {}

export class StatusFilterDto {
  @ApiProperty({ description: 'Buscar por nome (contém, case-insensitive)', required: false, example: 'pend' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  search?: string;

  @ApiProperty({ description: 'Filtrar por ativo', required: false, example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
