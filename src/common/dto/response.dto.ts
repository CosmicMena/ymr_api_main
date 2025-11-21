import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty()
  data?: T;

  constructor(message: string, data?: T) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'An error occurred' })
  message: string;

  @ApiProperty({ example: 'BAD_REQUEST' })
  error?: string;

  @ApiProperty({ example: 400 })
  statusCode?: number;

  @ApiProperty({ example: ['Field validation error'] })
  errors?: string[];

  constructor(message: string, error?: string, statusCode?: number, errors?: string[]) {
    this.success = false;
    this.message = message;
    this.error = error;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}