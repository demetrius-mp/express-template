import { PrismaClient } from '@prisma/client';
import { withExclude } from 'prisma-exclude';

const prisma = withExclude(new PrismaClient({
  log: ['query'],
}));

export default prisma;
