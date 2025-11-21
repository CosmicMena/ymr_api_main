"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function ensureAdminRole() {
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
async function grantAllPermissionsToRole(roleId) {
    const permissions = await prisma.accessPermission.findMany({ select: { id: true } });
    if (!permissions.length)
        return;
    for (const perm of permissions) {
        await prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId, permissionId: perm.id } },
            create: { roleId, permissionId: perm.id },
            update: {},
        });
    }
}
async function ensureAdminUser(roleId) {
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@ymr.local';
    const defaultName = process.env.DEFAULT_ADMIN_NAME || 'YMR Admin';
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin123!@#';
    const existing = await prisma.adminUser.findUnique({ where: { email: defaultEmail } });
    if (existing) {
        return { email: existing.email, password: defaultPassword };
    }
    const passwordHash = await bcryptjs_1.default.hash(defaultPassword, 12);
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
    console.log('Admin padrão disponível para login:');
    console.log(`  E-mail: ${creds.email}`);
    console.log(`  Senha:  ${creds.password}`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map