// Import dependencies
import { Router, Request, Response, NextFunction } from 'express';

// Import models
import { CourseType } from '../models/course-type';

export class CourseTypesRoute {
  router: Router; // Express router

  constructor() {
    this.router = Router(); // Set express router
    this.routes(); // Call routes
  }

  /**
   * Gets all course types.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public getCourseTypes(req: Request, res: Response, next: NextFunction): void | Response {
    CourseType
      .find({})
      .sort({
        type: 1
      })
      .then((courseTypes) => {
        // Send success message and courses
        res.success(200, courseTypes, null, {
          count: courseTypes.length
        });
      })
      .catch(next); // Catch the error using next middleware
  }

  /**
   * Adds a course type.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public addCourseType(req: Request, res: Response, next: NextFunction): void | Response {
    // Check if there a response type in body
    if (!req.body.type) {
      return res.error(400, 'No course type was provided.'); // Return and send error message
    }

    CourseType
      .create(req.body)
      .then((courseType) => {
        // Send success message and created course type
        res.success(201, courseType);
      })
      .catch(next); // Catch the error using next middleware
  }

  /**
   * Authentication routes.
   */
  routes(): void {
    const courseTypesRoute: Router = this.router.route('/coursetypes'); // Set route
    courseTypesRoute.get(this.getCourseTypes); // Get method for courseTypesRoute
    courseTypesRoute.post(this.addCourseType); // Post method for courseTypesRoute
  }
}

const courseTypesRoute: CourseTypesRoute = new CourseTypesRoute();
courseTypesRoute.routes();

// Export
export default courseTypesRoute.router;
