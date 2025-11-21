import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUUID, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ 
    description: 'ID único da categoria',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @IsUUID()
  id: string;

  @ApiProperty({ 
    description: 'Nome da categoria',
    example: 'Eletrônicos',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ 
    description: 'URL da imagem da categoria',
    example: 'https://exemplo.com/images/eletronicos.jpg',
    required: false
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  imageUrl?: string;

  @ApiProperty({ 
    description: 'Descrição detalhada da categoria',
    example: 'Produtos eletrônicos e tecnológicos de última geração',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ 
    description: 'Status de ativação da categoria',
    example: true,
    default: true
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ 
    description: 'Data de criação da categoria',
    example: '2024-08-24T10:30:00.000Z'
  })
  @IsString()
  createdAt: string;

  @ApiProperty({ 
    description: 'Data da última atualização da categoria',
    example: '2024-08-24T11:15:00.000Z'
  })
  @IsString()
  updatedAt: string;
}

export class CreateCategoryDto {
  @ApiProperty({ 
    description: 'Nome da categoria',
    example: 'Eletrônicos',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ 
    description: 'URL da imagem da categoria',
    example: 'https://exemplo.com/images/eletronicos.jpg',
    required: false
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  imageUrl?: string;

  @ApiProperty({ 
    description: 'Descrição detalhada da categoria',
    example: 'Produtos eletrônicos e tecnológicos de última geração',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ 
    description: 'Status de ativação da categoria',
    example: true,
    default: true
  })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateCategoryDto {
  @ApiProperty({ 
    description: 'Nome da categoria',
    example: 'Eletrônicos Avançados',
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @ApiProperty({ 
    description: 'URL da imagem da categoria',
    example: 'https://exemplo.com/images/nova-categoria.jpg',
    required: false
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  imageUrl?: string;

  @ApiProperty({ 
    description: 'Descrição detalhada da categoria',
    example: 'Produtos eletrônicos de última geração e inovação',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ 
    description: 'Status de ativação da categoria',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CategoryFilterDto {
  @ApiProperty({ 
    description: 'Filtrar por status ativo',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ 
    description: 'Termo de busca por nome ou descrição',
    example: 'eletrônicos',
    required: false
  })
  @IsOptional()
  @IsString()
  search?: string;
}