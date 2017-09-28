// Import dependencies
import { Router, Request, Response, NextFunction } from 'express';

// Import models
import { CourseType } from '../models/course-type';

export class CourseTypesRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
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
    if (!req.body.type) {
      // Return and send error message
      return res.error(400, 'No course type was provided.');
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
    const courseTypesRoute: Router = this.router.route('/coursetypes');
    courseTypesRoute.get(this.getCourseTypes);
    courseTypesRoute.post(this.addCourseType);
  }
}

const courseTypesRoute: CourseTypesRoute = new CourseTypesRoute();
courseTypesRoute.routes();

// Export
export default courseTypesRoute.router;
