import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsOptional, 
  IsUUID, 
  IsNumber, 
  IsBoolean, 
  IsDateString, 
  IsNotEmpty, 
  MaxLength, 
  Min, 
  IsIn,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ 
    description: 'ID do item do pedido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @IsUUID()
  id: string;

  @ApiProperty({ 
    description: 'ID do produto',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
  })
  @IsUUID()
  productId: string;

  @ApiProperty({ 
    description: 'Quantidade do produto',
    example: 2,
    minimum: 1
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ 
    description: 'Preço unitário',
    example: 1500.00,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @ApiProperty({ 
    description: 'Preço total do item',
    example: 3000.00,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  totalPrice: number;

  @ApiProperty({ 
    description: 'Observações do item',
    example: 'Produto com garantia estendida',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}

export class OrderDto {
  @ApiProperty({ 
    description: 'ID único do pedido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @IsUUID()
  id: string;

  @ApiProperty({ 
    description: 'Código único do pedido',
    example: 'ORD-2024-001'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiProperty({ 
    description: 'ID do usuário que fez o pedido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
  })
  @IsUUID()
  userId: string;

  @ApiProperty({ 
    description: 'ID do status atual do pedido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481'
  })
  @IsUUID()
  statusId: string;

  @ApiProperty({ 
    description: 'Tipo de serviço',
    example: 'Venda',
    enum: ['Venda', 'Orçamento', 'Serviço', 'Manutenção'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['Venda', 'Orçamento', 'Serviço', 'Manutenção'])
  serviceType?: string;

  @ApiProperty({ 
    description: 'Valor total do pedido',
    example: 15000.00,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiProperty({ 
    description: 'Moeda do pedido',
    example: 'AOA',
    enum: ['AOA', 'USD', 'EUR'],
    default: 'AOA'
  })
  @IsString()
  @IsIn(['AOA', 'USD', 'EUR'])
  currency: string;

  @ApiProperty({ 
    description: 'Notas ou observações do pedido',
    example: 'Entrega preferencialmente no período da manhã',
    required: false,
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiProperty({ 
    description: 'Endereço de entrega completo',
    example: 'Rua da Independência, 123, Apt 45, Luanda, Angola',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  deliveryAddress?: string;

  @ApiProperty({ 
    description: 'Data de entrega prevista',
    example: '2024-09-01',
    required: false
  })
  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @ApiProperty({ 
    description: 'Data de criação do pedido',
    example: '2024-08-19T19:00:00.000Z'
  })
  @IsString()
  createdAt: string;

  @ApiProperty({ 
    description: 'Data da última atualização',
    example: '2024-08-19T19:00:00.000Z'
  })
  @IsString()
  updatedAt: string;
}

export class CreateOrderDto {
  @ApiProperty({ 
    description: 'ID do usuário que fez o pedido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
  })
  @IsUUID()
  userId: string;

  @ApiProperty({ 
    description: 'ID do status inicial do pedido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481'
  })
  @IsUUID()
  statusId: string;

  @ApiProperty({ 
    description: 'Tipo de serviço',
    example: 'Venda',
    enum: ['Venda', 'Orçamento', 'Serviço', 'Manutenção'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['Venda', 'Orçamento', 'Serviço', 'Manutenção'])
  serviceType?: string;

  @ApiProperty({ 
    description: 'Valor total do pedido',
    example: 15000.00,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiProperty({ 
    description: 'Moeda do pedido',
    example: 'AOA',
    enum: ['AOA', 'USD', 'EUR'],
    default: 'AOA'
  })
  @IsString()
  @IsIn(['AOA', 'USD', 'EUR'])
  currency: string;

  @ApiProperty({ 
    description: 'Notas ou observações do pedido',
    example: 'Entrega preferencialmente no período da manhã',
    required: false,
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiProperty({ 
    description: 'Endereço de entrega completo',
    example: 'Rua da Independência, 123, Apt 45, Luanda, Angola',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  deliveryAddress?: string;

  @ApiProperty({ 
    description: 'Data de entrega prevista',
    example: '2024-09-01',
    required: false
  })
  @IsOptional()
  @IsDateString()
  deliveryDate?: string;
}

export class UpdateOrderDto {
  @ApiProperty({ 
    description: 'ID do status do pedido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    required: false
  })
  @IsOptional()
  @IsUUID()
  statusId?: string;

  @ApiProperty({ 
    description: 'Tipo de serviço',
    example: 'Venda',
    enum: ['Venda', 'Orçamento', 'Serviço', 'Manutenção'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['Venda', 'Orçamento', 'Serviço', 'Manutenção'])
  serviceType?: string;

  @ApiProperty({ 
    description: 'Valor total do pedido',
    example: 15000.00,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAmount?: number;

  @ApiProperty({ 
    description: 'Notas ou observações do pedido',
    example: 'Entrega preferencialmente no período da manhã',
    required: false,
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiProperty({ 
    description: 'Endereço de entrega completo',
    example: 'Rua da Independência, 123, Apt 45, Luanda, Angola',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  deliveryAddress?: string;

  @ApiProperty({ 
    description: 'Data de entrega prevista',
    example: '2024-09-01',
    required: false
  })
  @IsOptional()
  @IsDateString()
  deliveryDate?: string;
}

export class OrderFilterDto {
  @ApiProperty({ 
    description: 'Termo de busca por código do pedido',
    example: 'ORD-2024',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  search?: string;

  @ApiProperty({ 
    description: 'Filtrar por ID do usuário',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    required: false
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ 
    description: 'Filtrar por ID do status',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    required: false
  })
  @IsOptional()
  @IsUUID()
  statusId?: string;

  @ApiProperty({ 
    description: 'Filtrar por tipo de serviço',
    example: 'Venda',
    enum: ['Venda', 'Orçamento', 'Serviço', 'Manutenção'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['Venda', 'Orçamento', 'Serviço', 'Manutenção'])
  serviceType?: string;

  @ApiProperty({ 
    description: 'Valor mínimo do pedido',
    example: 1000.00,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minAmount?: number;

  @ApiProperty({ 
    description: 'Valor máximo do pedido',
    example: 50000.00,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxAmount?: number;

  @ApiProperty({ 
    description: 'Data de início para filtro',
    example: '2024-08-01',
    required: false
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ 
    description: 'Data de fim para filtro',
    example: '2024-08-31',
    required: false
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ 
    description: 'Campo para ordenação',
    example: 'createdAt',
    enum: ['createdAt', 'updatedAt', 'totalAmount', 'deliveryDate', 'code'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'updatedAt', 'totalAmount', 'deliveryDate', 'code'])
  sortBy?: string;

  @ApiProperty({ 
    description: 'Ordem da ordenação',
    example: 'desc',
    enum: ['asc', 'desc'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: string;
}
