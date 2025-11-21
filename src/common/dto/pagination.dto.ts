import { IsOptional, IsPositive, IsInt, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ 
    description: 'Page number', 
    example: 1, 
    minimum: 1,
    required: false 
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ 
    description: 'Number of items per page', 
    example: 10, 
    minimum: 1,
    maximum: 100,
    required: false 
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiProperty({ 
    description: 'Search term', 
    example: 'product name',
    required: false 
  })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  search?: string;

  @ApiProperty({ 
    description: 'Sort field', 
    example: 'createdAt',
    required: false 
  })
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ 
    description: 'Sort order', 
    example: 'desc',
    enum: ['asc', 'desc'],
    required: false 
  })
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}

export class PaginationResponseDto<T> {
  @ApiProperty({ description: 'Array of items' })
  data: T[];

  @ApiProperty({ 
    description: 'Pagination metadata',
    example: {
      page: 1,
      limit: 10,
      total: 100,
      totalPages: 10,
      hasNext: true,
      hasPrev: false
    }
  })
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}