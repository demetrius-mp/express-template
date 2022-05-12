import type { TypedRequestHandler } from '$src/global';
import prisma from '$src/lib/prisma';
import { validationMiddleware } from '$src/middlewares';
import { validateCreateBody, validateReadManyQuery, validateReadOneParams } from '$src/validators/invoice.validator';
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
    select: {
      id: true,
      title: true,
      description: true,
      value: true,
      dueDate: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(201).json(invoice);
};

type ReadManyQuery = {
  page?: number
}

export const readMany: TypedRequestHandler<{}, {}, ReadManyQuery> = async (req, res) => {
  const currentUser = req.user;

  const page = req.query.page || 1;
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

type ReadOneParams = {
  id: string
}

export const readOne: TypedRequestHandler<{}, ReadOneParams> = async (req, res) => {
  const currentUser = req.user;

  const { id } = req.params;

  const invoice = await prisma.invoice.findUnique({
    where: {
      id,
    },
  });

  if (invoice === null || invoice.userId !== currentUser.id) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  return res.json(invoice);
};

export const handleCreate = [
  validationMiddleware(validateCreateBody),
  create,
] as RequestHandler[];

export const handleReadMany = [
  validationMiddleware(validateReadManyQuery),
  readMany,
] as RequestHandler[];

export const handleReadOne = [
  validationMiddleware(validateReadOneParams),
  readOne,
] as RequestHandler[];
