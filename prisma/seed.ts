import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function ensureAdminRole(): Promise<string> {
  const roleName = process.env.DEFAULT_ADMIN_ROLE || 'admin';

  const existingRole = await prisma.userRole.findUnique({
    where: { name: roleName },
  });

  if (existingRole) {
    return existingRole.id;
  }

  const created = await prisma.userRole.create({
    data: {
      name: roleName,
      description: 'System administrator role with elevated privileges',
      isActive: true,
    },
  });

  return created.id;
}

async function grantAllPermissionsToRole(roleId: string): Promise<void> {
  const permissions = await prisma.accessPermission.findMany({ select: { id: true } });
  if (!permissions.length) return;

  // Create role-permission links if missing
  for (const perm of permissions) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId, permissionId: perm.id } },
      create: { roleId, permissionId: perm.id },
      update: {},
    });
  }
}

async function ensureAdminUser(roleId: string): Promise<{ email: string; password: string }> {
  const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@ymr.local';
  const defaultName = process.env.DEFAULT_ADMIN_NAME || 'YMR Admin';
  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin123!@#';

  const existing = await prisma.adminUser.findUnique({ where: { email: defaultEmail } });
  if (existing) {
    return { email: existing.email, password: defaultPassword };
  }

  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  await prisma.adminUser.create({
    data: {
      name: defaultName,
      email: defaultEmail,
      passwordHash,
      roleId,
      isActive: true,
    },
  });

  return { email: defaultEmail, password: defaultPassword };
}

async function main() {
  const roleId = await ensureAdminRole();
  await grantAllPermissionsToRole(roleId);
  const creds = await ensureAdminUser(roleId);

  // eslint-disable-next-line no-console
  console.log('Admin padrão disponível para login:');
  // eslint-disable-next-line no-console
  console.log(`  E-mail: ${creds.email}`);
  // eslint-disable-next-line no-console
  console.log(`  Senha:  ${creds.password}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


