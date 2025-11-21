import { IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    description: 'User email address',
    example: 'user@example.com' 
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ 
    description: 'User password',
    example: 'SecurePassword123!' 
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ 
    description: 'Full name',
    example: 'John Doe' 
  })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(150, { message: 'Name cannot exceed 150 characters' })
  name: string;

  @ApiProperty({ 
    description: 'Email address',
    example: 'john@example.com' 
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ 
    description: 'Password (minimum 8 characters, must include uppercase, lowercase, number and special character)',
    example: 'SecurePassword123!' 
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    { 
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' 
    }
  )
  password: string;

  @ApiProperty({ 
    description: 'Phone number',
    example: '+244 912 345 678',
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ 
    description: 'Company name',
    example: 'Tech Solutions Ltd',
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  company?: string;
}

export class RefreshTokenDto {
  @ApiProperty({ 
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' 
  })
  @IsString()
  refreshToken: string;
}