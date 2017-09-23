import { Router, Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import { CourseType } from '../models/courseType';

export class CourseTypesRoute {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getCourseTypes(req: Request, res: Response, next: NextFunction) {
    CourseType
      .find({})
      .sort({
        type: 1
      })
      .then((courseTypes) => {
        res.success(200, courseTypes, null, {
          count: courseTypes.length
        });
      })
      .catch(next);
  }

  public addCourseType(req: Request, res: Response, next: NextFunction) {

    if (!req.body.type) {
      return res.error(400, 'No course type was provided.'); // Return error message
    }

    CourseType
      .create(req.body)
      .then((courseType) => {
        res.success(201, courseType);
      })
      .catch(next);
  }

  routes() {
    const courseTypesRoute = this.router.route('/coursetypes');

    courseTypesRoute.get(this.getCourseTypes);
    courseTypesRoute.post(this.addCourseType);
  }
}

const courseTypesRoute = new CourseTypesRoute();
courseTypesRoute.routes();

export default courseTypesRoute.router;
