import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    // Check if user is admin
    if (user.userType === 'admin') {
      const adminUser = await this.prisma.adminUser.findUnique({
        where: { id: user.userId },
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

      if (!adminUser || !adminUser.isActive) {
        return false;
      }

      // Check if admin has required roles
      return requiredRoles.some(role => {
        // Super admin has all permissions
        if (adminUser.role.name === 'super_admin') {
          return true;
        }

        // Check specific role permissions
        return adminUser.role.rolePermissions.some(rp => 
          rp.permission.name === role ||
          rp.permission.resource === role
        );
      });
    }

    return false;
  }
}