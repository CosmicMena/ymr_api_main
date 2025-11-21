import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUUID, IsDateString } from 'class-validator';

export class UserRoleDto {
  @ApiProperty({ description: 'ID do papel', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do papel', example: 'Administrador' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição do papel', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Permissões (JSON)', required: false, example: '{"canEdit":true}' })
  @IsOptional()
  permissions?: any;

  @ApiProperty({ description: 'Papel ativo?', example: true, default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;
}

export class CreateUserRoleDto extends OmitType(UserRoleDto, ['id', 'createdAt'] as const) {}

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {}

export class UserRoleFilterDto {
  @ApiProperty({ description: 'Buscar por nome (contém)', required: false, example: 'admin' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Filtrar por ativo', required: false, example: true })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
