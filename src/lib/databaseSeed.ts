import { UserService } from "$src/services";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUsers() {
  const userService = new UserService(prisma);
  await userService.create({
    email: "admin@admin.com",
    name: "Admin",
    password: "admin",
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
