import { body, param, query } from 'express-validator';

export const validateCreateBody = [
  body('title')
    .isString()
    .withMessage('Title must be a string.'),

  body('value')
    .isFloat({
      gt: 0,
    })
    .withMessage('Value must be a greater than 0.')
    .toFloat(),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string.'),

  body('dueDate')
    .optional({
      nullable: true,
    })
    .isDate({
      format: 'YYYY-MM-DD',
    })
    .withMessage('Due date must be a date with the following format: "YYYY-MM-DD".')
    .toDate(),
];

export const validateReadManyQuery = [
  query('page')
    .optional()
    .isInt({
      gt: 0,
    })
    .withMessage('Page must be a number greater than 0.')
    .toInt(10),
];

export const validateReadOneParams = [
  param('id')
    .isString()
    .withMessage('Id must be a string.'),
];

export const validateArchiveParams = [
  param('id')
    .isString()
    .withMessage('Id must be a string.'),
];
