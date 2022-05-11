import { AuthService } from '$src/services';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUsers() {
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@admin.com',
        password: await AuthService.generatePasswordHash('admin'),
        name: 'Admin',
      },
    ],
  });
}

async function main() {
  await createUsers();
}

main()
  .catch((e) => {
  // eslint-disable-next-line no-console
    console.error(e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
