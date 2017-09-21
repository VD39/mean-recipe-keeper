import { NextFunction, Request, Response } from "express";

export const responseMiddleware = (req: Request, res: Response, next: NextFunction): void => {

  res.success = (status: number, results: any, message: any = null, meta: any = null): Response => {
    return res.status(status).json({
      status: 'success',
      data: results,
      message,
      meta
    });
  };

  res.error = (status: number, message: any = null, meta: any = null): Response => {
    return res.status(status).json({
      status: 'error',
      data: null,
      message,
      meta
    });
  };

  next();
};

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction): void => {
  res.error(422, error.message);
};

export const checkRequiredFields = (fields: any): object[] => {
  let errors = [];
  Object.keys(fields).map((field, index) => {

    const item = fields[field][0];
    const message = fields[field][1];

    console.log('item: ', !item);

    if (Array.isArray(item)) {
      if (item.length === 0) {
        errors.push({
          field,
          message
        });
      }
    } else if (!item) {
      errors.push({
        field,
        message
      });
    }
  });

  return errors;
};
