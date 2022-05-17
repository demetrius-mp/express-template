import { PrismaClient } from "@prisma/client";
import { withExclude } from "prisma-exclude";

const prisma = withExclude(new PrismaClient());

export default prisma;

export const excludePrismaFields = prisma.$exclude;
