import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsUUID,
  IsEmail,
  IsDateString,
  IsNotEmpty,
  MaxLength,
  IsPhoneNumber,
  IsUrl,
  IsIn,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'ID único do usuário',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva Santos',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+244 912 345 678',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({
    description: 'Data de nascimento',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiProperty({
    description: 'Endereço completo',
    example: 'Rua da Independência, 123, Apt 45',
    required: false,
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'Luanda',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiProperty({
    description: 'País',
    example: 'Angola',
    default: 'Angola',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  country: string;

  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Tech Solutions Angola',
    required: false,
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  company?: string;

  @ApiProperty({
    description: 'Cargo ou posição',
    example: 'Gerente de TI',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  position?: string;

  @ApiProperty({
    description: 'URL do avatar do usuário',
    example: 'https://exemplo.com/avatars/joao-silva.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  avatarUrl?: string;

  @ApiProperty({
    description: 'Hash da senha (uso interno)',
    required: false,
  })
  @IsOptional()
  @IsString()
  passwordHash?: string;

  @ApiProperty({
    description: 'ID do Google para login social',
    required: false,
  })
  @IsOptional()
  @IsString()
  googleId?: string;

  @ApiProperty({
    description: 'Indica se o e-mail foi verificado',
    example: false,
    default: false,
  })
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty({
    description: 'Status de ativação do usuário',
    example: true,
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Método de contato preferido',
    example: 'email',
    enum: ['email', 'phone', 'whatsapp'],
    default: 'email',
  })
  @IsString()
  @IsIn(['email', 'phone', 'whatsapp'])
  preferredContactMethod: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2024-08-24T10:30:00.000Z',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-08-24T11:15:00.000Z',
  })
  @IsString()
  updatedAt: string;

  @ApiProperty({
    description: 'Data do último login',
    example: '2024-08-24T09:45:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastLogin?: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva Santos',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+244 912 345 678',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({
    description: 'Data de nascimento',
    example: '1990-05-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiProperty({
    description: 'Endereço completo',
    example: 'Rua da Independência, 123, Apt 45',
    required: false,
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'Luanda',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiProperty({
    description: 'País',
    example: 'Angola',
    default: 'Angola',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  country: string;

  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Tech Solutions Angola',
    required: false,
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  company?: string;

  @ApiProperty({
    description: 'Cargo ou posição',
    example: 'Gerente de TI',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  position?: string;

  @ApiProperty({
    description: 'URL do avatar do usuário',
    example: 'https://exemplo.com/avatars/joao-silva.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  avatarUrl?: string;

  @ApiProperty({
    description: 'Hash da senha',
    required: false,
  })
  @IsOptional()
  @IsString()
  passwordHash?: string;

  @ApiProperty({
    description: 'ID do Google para login social',
    required: false,
  })
  @IsOptional()
  @IsString()
  googleId?: string;

  @ApiProperty({
    description: 'Indica se o e-mail foi verificado',
    example: false,
    default: false,
  })
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty({
    description: 'Status de ativação do usuário',
    example: true,
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Método de contato preferido',
    example: 'email',
    enum: ['email', 'phone', 'whatsapp'],
    default: 'email',
  })
  @IsString()
  @IsIn(['email', 'phone', 'whatsapp'])
  preferredContactMethod: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva Santos Junior',
    maxLength: 150,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name?: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao.novo@email.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+244 923 456 789',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({
    description: 'Data de nascimento',
    example: '1990-05-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiProperty({
    description: 'Endereço completo',
    example: 'Rua Nova da Independência, 456',
    required: false,
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'Benguela',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiProperty({
    description: 'País',
    example: 'Angola',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Petróleo & Gás Angola',
    required: false,
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  company?: string;

  @ApiProperty({
    description: 'Cargo ou posição',
    example: 'Diretor de TI',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  position?: string;

  @ApiProperty({
    description: 'URL do avatar do usuário',
    example: 'https://exemplo.com/avatars/novo-avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  avatarUrl?: string;

  @ApiProperty({
    description: 'Hash da senha',
    required: false,
  })
  @IsOptional()
  @IsString()
  passwordHash?: string;

  @ApiProperty({
    description: 'ID do Google para login social',
    required: false,
  })
  @IsOptional()
  @IsString()
  googleId?: string;

  @ApiProperty({
    description: 'Indica se o e-mail foi verificado',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty({
    description: 'Status de ativação do usuário',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Método de contato preferido',
    example: 'phone',
    enum: ['email', 'phone', 'whatsapp'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['email', 'phone', 'whatsapp'])
  preferredContactMethod?: string;

  @ApiProperty({
    description: 'Data do último login (uso interno)',
    example: '2024-08-24T09:45:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastLogin?: string;
}

export class UserFilterDto {
  @ApiProperty({
    description: 'Termo de busca por nome, e-mail ou empresa',
    example: 'joão silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiProperty({
    description: 'Filtrar por cidade',
    example: 'Luanda',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiProperty({
    description: 'Filtrar por país',
    example: 'Angola',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiProperty({
    description: 'Filtrar por status ativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Filtrar por e-mail verificado',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty({
    description: 'Campo para ordenação',
    example: 'createdAt',
    enum: ['name', 'email', 'createdAt', 'lastLogin', 'city'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['name', 'email', 'createdAt', 'lastLogin', 'city'])
  sortBy?: string;

  @ApiProperty({
    description: 'Ordem da ordenação',
    example: 'desc',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: string;
}