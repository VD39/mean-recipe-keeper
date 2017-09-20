// Get dependencies
import 'dotenv/config';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
// import * as cookieParser from 'cookie-parser';
// import * as compression from 'compression';
// import * as logger from 'morgan';
// import * as helmet from 'helmet';
// import * as cors from 'cors';
// import * as path from 'path';

import { responseMiddleware } from './middleware';

// Get our API routes
import RecipeRoute from './routes/recipes';
import AuthenticationRoute from './routes/authentication';


class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.connectToMongoDB();
    this.config();
    this.routes();
  }

  public connectToMongoDB() {
    // connect to mongodb
    mongoose.connect(process.env.MONGO_URI, {
      useMongoClient: true,
    }, (error) => {
      // Check if database was able to connect
      if (error) {
        console.log('Could not connect to database: ', error); // Return error message
      } else {
        console.log(`Connected to ${process.env.MONGO_URI}`); // Return success message
      }
    });
    mongoose.Promise = global.Promise;
  }

  // application config
  public config() {

    // express middleware
    this.app.use(responseMiddleware);
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());


    // index
    this.app.all('/api', this.indexRoute);
    this.app.all(`/api/${process.env.VERSION_NUMBER}`, this.indexRoute);
  }

  private indexRoute(req: express.Request, res: express.Response): void {
    res.success(200, null, 'Welcome to Recipe API');
  }

  // application routes
  public routes(): void {
    // initialize routes
    this.app.use(`/api/${process.env.VERSION_NUMBER}`, RecipeRoute); // Use Recipes routes in application
    this.app.use(`/api/${process.env.VERSION_NUMBER}`, AuthenticationRoute); // Use Authentication routes in application


  }


}

// export
export default new Server().app;
