import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUUID, IsEmail, IsDateString, MaxLength } from 'class-validator';

export class AdminUserDto {
  @ApiProperty({ description: 'ID do administrador', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nome do administrador', example: 'Maria Admin' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'E-mail do administrador', example: 'admin@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Hash da senha', required: false })
  @IsString()
  passwordHash: string;

  @ApiProperty({ description: 'URL do avatar', example: 'https://exemplo.com/avatar.png', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ description: 'ID do papel', example: 'uuid' })
  @IsUUID()
  roleId: string;

  @ApiProperty({ description: 'Administrador ativo?', example: true, default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Último login', example: '2024-08-19T19:00:00.000Z', required: false })
  @IsOptional()
  @IsString()
  lastLogin?: string;

  @ApiProperty({ description: 'ID do criador', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  createdBy?: string;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;

  @ApiProperty({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  updatedAt: string;
}

export class CreateAdminUserDto extends OmitType(AdminUserDto, ['id', 'passwordHash', 'lastLogin', 'createdAt', 'updatedAt'] as const) {
  @ApiProperty({ description: 'Senha do administrador (texto plano)', example: 'StrongPass@123' })
  @IsString()
  @MaxLength(128)
  password: string;
}

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {}

export class AdminUserFilterDto {
  @ApiProperty({ description: 'Buscar por nome/email (contém)', required: false, example: 'maria' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ description: 'Filtrar por papel', required: false, example: 'uuid-role' })
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @ApiProperty({ description: 'Filtrar por ativo', required: false, example: true })
  @IsOptional()
  @IsBoolean()
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
