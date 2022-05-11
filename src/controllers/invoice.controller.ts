import type { TypedRequestHandler } from '$src/global';
import prisma from '$src/lib/prisma';
import { validationMiddleware } from '$src/middlewares';
import { validateCreateBody, validateReadManyParams } from '$src/validators/invoice.validator';
import type { Invoice } from '@prisma/client';
import type { RequestHandler } from 'express';

type CreateBody = Omit<Invoice, 'id'|'userId'|'createdAt'|'updatedAt'>

const create: TypedRequestHandler<CreateBody> = async (req, res) => {
  const currentUser = req.user;

  const data = req.body;

  const invoice = await prisma.invoice.create({
    data: {
      ...data,
      userId: currentUser.id,
    },
  });

  res.status(201).json(invoice);
};

interface ReadManyQuery {
  page: string
}

export const readMany: TypedRequestHandler<{}, {}, ReadManyQuery> = async (req, res) => {
  const currentUser = req.user;

  const page = parseInt(req.query.page, 10);
  const ITEMS_PER_PAGE = 10;

  const invoices = await prisma.invoice.findMany({
    where: {
      userId: currentUser.id,
    },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  const totalInvoices = await prisma.invoice.count({
    where: {
      userId: currentUser.id,
    },
  });

  return res.json({
    items: invoices,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: totalInvoices,
  });
};

export const handleCreate = [
  validationMiddleware(validateCreateBody),
  create,
] as RequestHandler[];

export const handleReadMany = [
  validationMiddleware(validateReadManyParams),
  readMany,
] as RequestHandler[];
