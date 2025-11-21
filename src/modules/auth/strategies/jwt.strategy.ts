import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const { sub: userId, email, userType, role, permissions } = payload;

    // Verify user still exists and is active
    if (userType === 'user') {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, isActive: true },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('User account is not active');
      }

      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        userType: 'user',
      };
    } else if (userType === 'admin') {
      const adminUser = await this.prisma.adminUser.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, isActive: true },
      });

      if (!adminUser || !adminUser.isActive) {
        throw new UnauthorizedException('Admin account is not active');
      }

      return {
        userId: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        userType: 'admin',
        role,
        permissions,
      };
    }

    throw new UnauthorizedException('Invalid user type');
  }
}