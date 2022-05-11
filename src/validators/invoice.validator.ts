import { body, query } from 'express-validator';

export const validateCreateBody = [
  body('title')
    .isString()
    .withMessage('Title must be a string.'),

  body('value')
    .isFloat({
      gt: 0,
    })
    .withMessage('Value must be a greater than 0.'),

  body('description')
    .isString()
    .withMessage('Description must be a string.'),

  body('dueDate')
    .optional({
      nullable: true,
    })
    .isDate({
      format: 'YYYY-MM-DD',
    })
    .withMessage('Due date must be a date with the following format: "YYYY-MM-DD".'),
];

export const validateReadManyParams = [
  query('page')
    .isInt({
      gt: 0,
    })
    .withMessage('Page must be a number greater than 0.'),
];
