import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsInt, IsDateString } from 'class-validator';

export class ShoppingCartDto {
  @ApiProperty({ description: 'ID do carrinho', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'ID do usuário', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'ID da sessão', example: 'sess-123', required: false })
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiProperty({ description: 'ID do produto', example: 'uuid' })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Quantidade', example: 1 })
  @IsInt()
  quantity: number;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;

  @ApiProperty({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  updatedAt: string;
}

export class CreateShoppingCartDto extends OmitType(ShoppingCartDto, ['id', 'createdAt', 'updatedAt'] as const) {}

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {}

export class ShoppingCartFilterDto {
  @ApiProperty({ description: 'Filtrar por usuário', required: false, example: 'uuid-user' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Filtrar por sessão', required: false, example: 'sess-123' })
  @IsOptional()
  @IsString()
  sessionId?: string;

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
