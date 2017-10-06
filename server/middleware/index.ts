// Import dependencies
import { NextFunction, Request, Response } from 'express';

// Import interfaces
import { IRecipe, IFields, IErrors } from '../interfaces';

/**
 * Response middleware for success and error methods.
 * @param req {Request} - The express request object.
 * @param res {Response} - The express response object.
 * @param next {NextFunction} - The next function to continue.
 */
export const responseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  /**
   * Success response.
   * @param status {number} - Status of the response.
   * @param results {any} - Result to send with the response.
   * @param message {any} - Message to send with the response.
   * @param meta {any} - Meta data to send with the response.
   */
  res.success = (status: number, results: any, message: any = null, meta: any = null): Response => {
    // Return repsonse
    return res.status(status).json({
      status: 'success',
      data: results,
      message,
      meta
    });
  };

  /**
   * Error response.
   * @param status {number} - Status of the response.
   * @param message {any} - Message to send with the response.
   * @param meta {any} - Meta data to send with the response.
   */
  res.error = (status: number, message: any = null, meta: any = null): Response => {
    // Return repsonse
    return res.status(status).json({
      status: 'error',
      data: null,
      message,
      meta
    });
  };

  /**
   * Checks fields exist and returns the errors.
   * @param fields {IRecipe} - Fields to check from the response.
   */
  res.checkRequiredFields = (fields: IRecipe): IErrors[] => {
    const errors: IErrors[] = []; // Errors array to hold
    const requiredFields: IFields = {
      type: [fields.type, 'Type is required.'], // Type input field
      name: [fields.name, 'Name is required.'], // Name input field
      image: [fields.image, 'Image is required.'], // Image input field
      serves: [fields.serves, 'Serves total is required.'], // Serves input field
      prep_time: [fields.prep_time, 'Prep Time is required.'], // Prep time input field
      cook_time: [fields.cook_time, 'Cook Time is required.'], // Cook time input field
      course_type: [fields.course_type, 'Course Type is required.'], // Course type input field
      directions: [fields.directions, 'Directions is required.'], // Direction input field
      ingredients: [fields.ingredients, 'Ingredients is required.'] // Ingredients input field
    };

    // Check type is 0 or 1
    if (fields.type < 0 || fields.type > 1) {
      errors.push({
        field: 'type',
        message: 'Type is not correct, must be either 0 or 1.'
      });
    }

    // Map over objects
    Object.keys(requiredFields).map((field, index) => {
      const item: any = requiredFields[field][0]; // Input from body
      const message: any = requiredFields[field][1]; // The error message

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

    return errors; // Return errors
  };

  next();
};

/**
 * Middleware for errors within routes.
 * @param error {any} - The error of the repsonse.
 * @param req {Request} - The express request object.
 * @param res {Response} - The express response object.
 * @param next {NextFunction} - The next function to continue.
 */
export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction): void => {
  res.error(422, error.message); // Return error response
};
