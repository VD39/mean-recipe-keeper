// Import dependencies
import { NextFunction, Request, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';

// Import models
import { User } from '../models/user';

class AuthenticationRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * Login route.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public login(req: Request, res: Response, next: NextFunction): void | Response {
    if (!req.body.email) {
      // Return and send error message
      return res.error(422, 'Email not set.');
    }

    if (!req.body.password) {
      // Return and send error message
      return res.error(422, 'Password not set.');
    }

    User
      .findOne({
        email: req.body.email.toLowerCase()
      })
      .then((user) => {
        if (!user) {
          // Return and send error message
          return res.error(422, 'Email not found.');
        }

        // Validates the password
        const validPassword = user.comparePassword(req.body.password, user.password);

        if (!validPassword) {
          // Return and send error message
          return res.error(422, 'Password was incorrect.');
        }

        // Create a token for client
        const token = sign({
          userId: user._id
        }, 'secret', {
            expiresIn: '24h'
          });

        // Send success message and token to frontend
        res.success(200, { token }, 'Success!', {
          user: {
            email: user.email
          }
        });
      })
      .catch(next); // Catch the error using next middleware
  }

  /**
   * Authentication routes.
   */
  routes(): void {
    const loginRoute: Router = this.router.route('/auth/login');
    loginRoute.post(this.login);
  }
}

const authenticationRoute: AuthenticationRoute = new AuthenticationRoute();
authenticationRoute.routes();

// Export
export default authenticationRoute.router;
