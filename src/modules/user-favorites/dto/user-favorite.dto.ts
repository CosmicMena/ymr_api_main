import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsDateString } from 'class-validator';

export class UserFavoriteDto {
  @ApiProperty({ description: 'ID do favorito', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'ID do usuário', example: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'ID do produto', example: 'uuid' })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  createdAt: string;
}

export class CreateUserFavoriteDto extends OmitType(UserFavoriteDto, ['id', 'createdAt'] as const) {}

export class UpdateUserFavoriteDto extends PartialType(CreateUserFavoriteDto) {}

export class UserFavoriteFilterDto {
  @ApiProperty({ description: 'Filtrar por usuário', required: false, example: 'uuid-user' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Filtrar por produto', required: false, example: 'uuid-produto' })
  @IsOptional()
  @IsUUID()
  productId?: string;

  @ApiProperty({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
