import { Module } from '@nestjs/common';
import { AccessPermissionService } from './access-permission.service';
import { AccessPermissionController } from './access-permission.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [AccessPermissionController],
  providers: [AccessPermissionService, PrismaService],
  exports: [AccessPermissionService], // caso outra entidade precise consultar permissões
})
export class AccessPermissionModule {}
