import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDecimal,
  IsInt,
  IsArray,
  IsObject,
  IsUUID,
  MinLength,
  MaxLength,
  Min,
  IsNumber,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateProductDto {
  @ApiProperty({ description: 'Unique product code', example: 'YMR-2024-001' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  code: string;

  @ApiProperty({ description: 'Product name', example: 'Industrial Generator 500KW' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  name: string;

  @ApiProperty({ description: 'Product model', example: 'GEN-500-XL', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  model?: string;

  @ApiProperty({ description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Product features array',
    example: ['High efficiency', 'Low maintenance', 'Remote monitoring'],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({ 
    description: 'Product images URLs',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ 
    description: 'Product specifications in JSON format',
    example: { power: '500KW', fuel: 'Diesel', voltage: '380V' },
    required: false
  })
  @IsOptional()
  @IsObject()
  specifications?: any;

  @ApiProperty({ 
    description: 'Product documents in JSON format',
    example: { manual: 'https://example.com/manual.pdf', datasheet: 'https://example.com/spec.pdf' },
    required: false
  })
  @IsOptional()
  @IsObject()
  documents?: any;

  @ApiProperty({ 
    description: 'Product availability status',
    example: 'Em Estoque',
    default: 'Em Estoque',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  availability?: string = 'Em Estoque';

  @ApiProperty({ description: 'Product price', example: 50000.00 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Stock quantity', example: 10, default: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  stockQuantity?: number = 0;

  @ApiProperty({ description: 'Product active status', default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({ description: 'Subcategory ID', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  subcategoryId?: string;

  @ApiProperty({ description: 'Brand ID', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  brandId?: string;
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Unique product code', example: 'YMR-2024-001', required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  code?: string;

  @ApiProperty({ description: 'Product name', example: 'Industrial Generator 500KW', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  name?: string;

  @ApiProperty({ description: 'Product model', example: 'GEN-500-XL', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  model?: string;

  @ApiProperty({ description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Product features array',
    example: ['High efficiency', 'Low maintenance', 'Remote monitoring'],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({ 
    description: 'Product images URLs',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ 
    description: 'Product specifications in JSON format',
    example: { power: '500KW', fuel: 'Diesel', voltage: '380V' },
    required: false
  })
  @IsOptional()
  @IsObject()
  specifications?: any;

  @ApiProperty({ 
    description: 'Product documents in JSON format',
    example: { manual: 'https://example.com/manual.pdf', datasheet: 'https://example.com/spec.pdf' },
    required: false
  })
  @IsOptional()
  @IsObject()
  documents?: any;

  @ApiProperty({ 
    description: 'Product availability status',
    example: 'Em Estoque',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  availability?: string;

  @ApiProperty({ description: 'Product price', example: 50000.00, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number;

  @ApiProperty({ description: 'Stock quantity', example: 10, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  stockQuantity?: number;

  @ApiProperty({ description: 'Product active status', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Subcategory ID', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  subcategoryId?: string;

  @ApiProperty({ description: 'Brand ID', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  brandId?: string;
}

export class ProductFilterDto {
  @ApiProperty({ description: 'Filter by brand ID', required: false })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiProperty({ description: 'Filter by subcategory ID', required: false })
  @IsOptional()
  @IsUUID()
  subcategoryId?: string;

  @ApiProperty({ description: 'Filter by category ID', required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ description: 'Minimum price filter', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiProperty({ description: 'Maximum price filter', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiProperty({ description: 'Filter by active status', required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;
}

export class ProductListQueryDto extends PaginationDto {
  @ApiProperty({ description: 'Filter by brand ID', required: false })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiProperty({ description: 'Filter by subcategory ID', required: false })
  @IsOptional()
  @IsUUID()
  subcategoryId?: string;

  @ApiProperty({ description: 'Filter by category ID', required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ description: 'Minimum price filter', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiProperty({ description: 'Maximum price filter', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiProperty({ description: 'Filter by active status', required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;
}