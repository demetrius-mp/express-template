import prisma from '$src/lib/prisma';
import { validationMiddleware } from '$src/middlewares';
import { validateIdInParams } from '$src/validators/common.validator';
import {
  validateCreateBody, validateReadManyQuery, validateUpdate,
} from '$src/validators/invoice.validator';
import type { Invoice, Prisma } from '@prisma/client';
import type { RequestHandler } from 'express';

type CreateBody = Omit<Invoice, 'id'|'userId'|'createdAt'|'updatedAt'|'archived'>

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
      archived: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(201).json(invoice);
};

type ReadManyQuery = {
  page?: number
  showArchived?: boolean
}

export const readMany: TypedRequestHandler<{}, {}, ReadManyQuery> = async (req, res) => {
  const currentUser = req.user;

  const page = req.query.page || 1;
  const ITEMS_PER_PAGE = 10;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const showArchived = req.query.showArchived || false;
  let whereClause: Prisma.Enumerable<Prisma.InvoiceWhereInput>;
  if (showArchived) {
    whereClause = {
      userId: currentUser.id,
    };
  } else {
    whereClause = {
      AND: [
        {
          userId: currentUser.id,
        },
        {
          archived: false,
        },
      ],
    };
  }

  const invoices = await prisma.invoice.findMany({
    where: whereClause,
    skip,
    take: ITEMS_PER_PAGE,
  });

  const totalInvoices = await prisma.invoice.count({
    where: whereClause,
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

type ArchiveParams = {
  id: string
}

export const archive: TypedRequestHandler<{}, ArchiveParams> = async (req, res) => {
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

  await prisma.invoice.update({
    data: {
      archived: true,
    },
    where: {
      id: invoice.id,
    },
  });

  return res.sendStatus(204);
};

type UpdateBody = Omit<Invoice, 'id'|'userId'|'createdAt'|'updatedAt'>

type UpdateParams = {
  id: string
}

const update: TypedRequestHandler<UpdateBody, UpdateParams> = async (req, res) => {
  const currentUser = req.user;

  const { id } = req.params;

  const data = req.body;

  const invoice = await prisma.invoice.findUnique({
    where: {
      id,
    },
  });

  if (invoice === null || invoice.userId !== currentUser.id) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  const updatedInvoice = await prisma.invoice.update({
    data,
    where: {
      id: invoice.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      value: true,
      dueDate: true,
      archived: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.json(updatedInvoice);
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
  validationMiddleware(validateIdInParams),
  readOne,
] as RequestHandler[];

export const handleArchive = [
  validationMiddleware(validateIdInParams),
  archive,
] as RequestHandler[];

export const handleUpdate = [
  validationMiddleware(validateUpdate),
  update,
] as RequestHandler[];
