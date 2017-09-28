// Import dependencies
import { NextFunction, Request, Response } from 'express';
import { IFields } from '../interfaces/fields.interface';

// Import interfaces

/**
 * Response middleware for success and error methods.
 * @param req
 * @param res
 * @param next
 */
export const responseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  /**
   * Success response.
   * @param status
   * @param results
   * @param message
   * @param meta
   */
  res.success = (status: number, results: any, message: any = null, meta: any = null): Response => {
    // Returns repsonse
    return res.status(status).json({
      status: 'success',
      data: results,
      message,
      meta
    });
  };

  /**
   * Error response.
   * @param status
   * @param results
   * @param message
   * @param meta
   */
  res.error = (status: number, message: any = null, meta: any = null): Response => {
    // Returns repsonse
    return res.status(status).json({
      status: 'error',
      data: null,
      message,
      meta
    });
  };

  next();
};

/**
 * Middleware for errors within routes.
 * @param error
 * @param req
 * @param res
 * @param next
 */
export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction): void => {
  res.error(422, error.message);
};

/**
 * Checks fields exist and returns the errors
 * @param fields
 */
export const checkRequiredFields = (fields: IFields): object[] => {
  let errors = [];

  // Map over objects
  Object.keys(fields).map((field, index) => {
    const item: any = fields[field][0];
    const message: any = fields[field][1];

    // Check if item is array or not
    if (Array.isArray(item)) {
      if (item.length === 0) {
        errors.push({
          field,
          message
        });
      }
    } else if (!item && item !== 0) {
      errors.push({
        field,
        message
      });
    }
  });

  // Returns errors
  return errors;
};
