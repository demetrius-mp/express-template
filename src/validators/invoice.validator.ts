import { body, query } from 'express-validator';
import { validateIdInParams, validatePageInQuery } from './common.validator';

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

  body('categories')
    .isArray()
    .withMessage('Categories must be an array of strings.'),

  body('categories.*')
    .isString()
    .withMessage('Categories must be an array of strings.'),
];

export const validateReadManyQuery = [
  ...validatePageInQuery,

  query('showArchived')
    .optional()
    .isBoolean()
    .withMessage('Show archived must be a boolean.')
    .toBoolean(),
];

export const validateUpdate = [
  ...validateIdInParams,

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

  body('archived')
    .isBoolean({
      strict: true,
    })
    .withMessage('Archived must be a boolean.')
    .toBoolean(),
];
