// Import dependencies
import { NextFunction, Request, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';

// Import models
import { User } from '../models/user';

class AuthenticationRoute {
  router: Router; // Express router

  constructor() {
    this.router = Router(); // Set express router
    this.routes(); // Call routes
  }

  /**
   * Login route.
   * @param req {Request} - The express request object.
   * @param res {Response} - The express response object.
   * @param next {NextFunction} - The next function to continue.
   */
  public login(req: Request, res: Response, next: NextFunction): void | Response {
    // Check if email is in body response
    if (!req.body.email) {
      return res.error(422, 'Email not set.'); // Return and send error message
    }

    // Check if password is in body response
    if (!req.body.password) {
      return res.error(422, 'Password not set.'); // Return and send error message
    }

    User
      .findOne({
        email: req.body.email.toLowerCase()
      })
      .then((user) => {
        // Check is user was found
        if (!user) {
          return res.error(422, 'Email not found.'); // Return and send error message
        }

        // Validates the password
        const validPassword = user.comparePassword(req.body.password, user.password);

        // Check if the password was a match
        if (!validPassword) {
          return res.error(422, 'Password was incorrect.'); // Return and send error message
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
    const loginRoute: Router = this.router.route('/auth/login'); // Set route
    loginRoute.post(this.login); // Post method for loginRoute
  }
}

const authenticationRoute: AuthenticationRoute = new AuthenticationRoute();
authenticationRoute.routes();

// Export
export default authenticationRoute.router;
