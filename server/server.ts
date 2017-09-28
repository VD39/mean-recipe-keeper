// Import dependencies
import 'dotenv/config';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

// Import middleware
import { responseMiddleware } from './middleware';

// Import API routes
import RecipeRoute from './routes/recipes';
import AuthenticationRoute from './routes/authentication';
import CourseTypesRoute from './routes/course-types';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.connectToMongoDB();
    this.config();
    this.routes();
  }

  /**
   * Connects to MongoDB.
   */
  public connectToMongoDB(): void {
    mongoose.connect(process.env.MONGO_URI, {
      useMongoClient: true,
    }, (error) => {
      // Check if database was able to connect
      if (error) {
        console.log('Could not connect to database: ', error); // Log error message
      } else {
        console.log(`Connected to ${process.env.MONGO_URI}`); // Log success message
      }
    });
    mongoose.Promise = global.Promise;
  }

  /**
   * Creates the index route.
   * @param req
   * @param res
   */
  private indexRoute(req: express.Request, res: express.Response): void {
    res.success(200, null, 'Welcome to Recipe API');
  }

  /**
   * Application config for Express middleware.
   */
  public config() {
    this.app.use(responseMiddleware);
    this.app.use(bodyParser.json({
      limit: '50mb'
    }));
    this.app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    }));

    // API routes
    this.app.all('/api', this.indexRoute);
    this.app.all(`/api/${process.env.VERSION_NUMBER}`, this.indexRoute);
  }

  /**
   * Application routes.
   */
  public routes(): void {
    this.app.use(`/api/${process.env.VERSION_NUMBER}`, RecipeRoute); // Use Recipes routes in application
    this.app.use(`/api/${process.env.VERSION_NUMBER}`, AuthenticationRoute); // Use Authentication routes in application
    this.app.use(`/api/${process.env.VERSION_NUMBER}`, CourseTypesRoute); // Use Course routes in application
  }
}

// Export
export default new Server().app;
