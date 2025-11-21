import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionService, PrismaService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
