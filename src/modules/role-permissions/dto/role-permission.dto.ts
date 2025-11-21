import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsDateString } from 'class-validator';

export class RolePermissionDto {
  @ApiProperty({ description: 'ID do papel', example: 'uuid' })
  @IsUUID()
  roleId: string;

  @ApiProperty({ description: 'ID da permissão', example: 'uuid' })
  @IsUUID()
  permissionId: string;

  @ApiProperty({ description: 'Data de concessão', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  grantedAt: string;
}

export class CreateRolePermissionDto extends OmitType(RolePermissionDto, ['grantedAt'] as const) {}

export class UpdateRolePermissionDto extends PartialType(CreateRolePermissionDto) {}

export class RolePermissionFilterDto {
  @ApiProperty({ description: 'Filtrar por papel', required: false, example: 'uuid-role' })
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @ApiProperty({ description: 'Filtrar por permissão', required: false, example: 'uuid-permission' })
  @IsOptional()
  @IsUUID()
  permissionId?: string;

  @ApiProperty({ description: 'Data início (grantedAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (grantedAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
