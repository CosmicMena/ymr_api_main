import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, MaxLength, IsIn, IsDateString } from 'class-validator';

export class MessageThreadDto {
  @ApiProperty({ description: 'ID do tópico de mensagem', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Assunto', example: 'Dúvida sobre produto' })
  @IsString()
  @MaxLength(255)
  subject: string;

  @ApiProperty({ description: 'ID do usuário', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'ID do admin', example: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  adminId?: string;

  @ApiProperty({ description: 'Status do tópico', example: 'open', default: 'open', enum: ['open','closed','pending'] })
  @IsString()
  @IsIn(['open','closed','pending'])
  status: string;

  @ApiProperty({ description: 'Prioridade', example: 'normal', default: 'normal', enum: ['low','normal','high'] })
  @IsString()
  @IsIn(['low','normal','high'])
  priority: string;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;

  @ApiProperty({ description: 'Data de atualização', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  updatedAt: string;
}

export class CreateMessageThreadDto extends OmitType(MessageThreadDto, ['id', 'createdAt', 'updatedAt'] as const) {}

export class UpdateMessageThreadDto extends PartialType(CreateMessageThreadDto) {}

export class MessageThreadFilterDto {
  @ApiProperty({ description: 'Buscar por assunto (contém)', required: false, example: 'produto' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;

  @ApiProperty({ description: 'Filtrar por usuário', required: false, example: 'uuid-user' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Filtrar por admin', required: false, example: 'uuid-admin' })
  @IsOptional()
  @IsUUID()
  adminId?: string;

  @ApiProperty({ description: 'Filtrar por status', required: false, example: 'open', enum: ['open','closed','pending'] })
  @IsOptional()
  @IsString()
  @IsIn(['open','closed','pending'])
  status?: string;

  @ApiProperty({ description: 'Filtrar por prioridade', required: false, example: 'high', enum: ['low','normal','high'] })
  @IsOptional()
  @IsString()
  @IsIn(['low','normal','high'])
  priority?: string;

  @ApiProperty({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
