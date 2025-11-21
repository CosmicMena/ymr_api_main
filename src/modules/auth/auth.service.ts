import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma/prisma.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Check in users table first
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && user.passwordHash && await bcrypt.compare(password, user.passwordHash)) {
      if (!user.isActive) {
        throw new UnauthorizedException('Account is deactivated');
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        userType: 'user',
      };
    }

    // Check in admin_users table
    const adminUser = await this.prisma.adminUser.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (adminUser && await bcrypt.compare(password, adminUser.passwordHash)) {
      if (!adminUser.isActive) {
        throw new UnauthorizedException('Admin account is deactivated');
      }

      await this.prisma.adminUser.update({
        where: { id: adminUser.id },
        data: { lastLogin: new Date() },
      });

      const permissions = adminUser.role.rolePermissions.map(rp => rp.permission.name);

      return {
        userId: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        userType: 'admin',
        role: adminUser.role.name,
        permissions,
      };
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.userId,
      email: user.email,
      userType: user.userType,
      role: user.role,
      permissions: user.permissions,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { sub: user.userId, type: 'refresh' },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
      },
    );

    // Log the login activity
    await this.logActivity(user.userId, user.userType, 'login', 'User logged in successfully');

    return {
      user: {
        id: user.userId,
        email: user.email,
        name: user.name,
        userType: user.userType,
        role: user.role,
        permissions: user.permissions,
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        phone: registerDto.phone,
        company: registerDto.company,
        passwordHash: hashedPassword,
      },
    });

    // Create user statistics record
    await this.prisma.userStatistics.create({
      data: {
        userId: user.id,
      },
    });

    // Log the registration activity
    await this.logActivity(user.id, 'user', 'register', 'User registered successfully');

    // Create tokens
    const payload = {
      sub: user.id,
      email: user.email,
      userType: 'user',
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
      },
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: 'user',
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
      },
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const decoded = this.jwtService.verify(refreshTokenDto.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      if (decoded.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Find user in both tables
      let user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      });

      let userType = 'user';
      let role = null;
      let permissions = [];

      if (!user) {
        const adminUser = await this.prisma.adminUser.findUnique({
          where: { id: decoded.sub },
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        });

        if (!adminUser) {
          throw new UnauthorizedException('User not found');
        }

        user = adminUser as any;
        userType = 'admin';
        role = adminUser.role.name;
        permissions = adminUser.role.rolePermissions.map(rp => rp.permission.name);
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Account is deactivated');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        userType,
        role,
        permissions,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async logActivity(userId: string, userType: string, action: string, description: string) {
    const logData: any = {
      action,
      description,
      resourceType: 'authentication',
    };

    if (userType === 'user') {
      logData.userId = userId;
    } else {
      logData.adminId = userId;
    }

    await this.prisma.activityLog.create({
      data: logData,
    });
  }
}