import { Module } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { AdminUserController } from './admin-user.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [AdminUserController],
  providers: [AdminUserService, PrismaService],
  exports: [AdminUserService], // caso outro módulo precise consultar administradores
})
export class AdminUserModule {}
