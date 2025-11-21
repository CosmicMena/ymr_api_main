import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [UserRolesController],
  providers: [UserRolesService, PrismaService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
