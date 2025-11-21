import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsBoolean, IsDateString } from 'class-validator';

export class MessageDto {
  @ApiProperty({ description: 'ID da mensagem', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'ID do tópico', example: 'uuid' })
  @IsUUID()
  threadId: string;

  @ApiProperty({ description: 'Tipo de remetente', example: 'user' })
  @IsString()
  senderType: string;

  @ApiProperty({ description: 'ID do remetente', example: 'uuid' })
  @IsUUID()
  senderId: string;

  @ApiProperty({ description: 'Conteúdo da mensagem' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Anexos (JSON)', required: false })
  @IsOptional()
  attachments?: any;

  @ApiProperty({ description: 'Mensagem lida?', example: false, default: false })
  @IsBoolean()
  isRead: boolean;

  @ApiProperty({ description: 'Data de criação', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  createdAt: string;
}

export class CreateMessageDto extends OmitType(MessageDto, ['id', 'createdAt'] as const) {}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}

export class MessageFilterDto {
  @ApiProperty({ description: 'Filtrar por tópico', required: false, example: 'uuid-thread' })
  @IsOptional()
  @IsUUID()
  threadId?: string;

  @ApiProperty({ description: 'Filtrar por remetente', required: false, example: 'uuid-user' })
  @IsOptional()
  @IsUUID()
  senderId?: string;

  @ApiProperty({ description: 'Apenas não lidas', required: false, example: true })
  @IsOptional()
  isUnread?: boolean;

  @ApiProperty({ description: 'Data início (createdAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (createdAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
