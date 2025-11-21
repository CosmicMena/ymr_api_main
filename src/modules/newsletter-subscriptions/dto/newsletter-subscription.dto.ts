import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUUID, IsEmail, IsDateString } from 'class-validator';

export class NewsletterSubscriptionDto {
  @ApiProperty({ description: 'ID da inscrição', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'E-mail', example: 'usuario@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Nome', example: 'João', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Inscrição ativa?', example: true, default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Interesses', example: ['produtos', 'novidades'] })
  interests: string[];

  @ApiProperty({ description: 'Data de inscrição', example: '2024-08-19T19:00:00.000Z' })
  @IsString()
  subscribedAt: string;

  @ApiProperty({ description: 'Data de cancelamento', example: '2024-09-01T19:00:00.000Z', required: false })
  @IsOptional()
  @IsString()
  unsubscribedAt?: string;
}

export class CreateNewsletterSubscriptionDto extends OmitType(NewsletterSubscriptionDto, ['id', 'subscribedAt', 'unsubscribedAt'] as const) {}

export class UpdateNewsletterSubscriptionDto extends PartialType(CreateNewsletterSubscriptionDto) {}

export class NewsletterSubscriptionFilterDto {
  @ApiProperty({ description: 'Buscar por e-mail (contém)', required: false, example: 'gmail.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Filtrar por ativo', required: false, example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Filtrar por interesse', required: false, example: 'novidades' })
  @IsOptional()
  @IsString()
  interest?: string;

  @ApiProperty({ description: 'Data início (subscribedAt >=)', required: false, example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Data fim (subscribedAt <=)', required: false, example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
