import { NextFunction, Request, Response, Router } from "express";
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';

class AuthenticationRoute {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public login(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email) {
      return res.error(422, 'Email not set.');
    }

    if (!req.body.password) {
      return res.error(422, 'Password not set.');
    }

    User
      .findOne({
        email: req.body.email.toLowerCase()
      })
      .then((user) => {
        if (!user) {
          return res.error(422, 'Email not found.');
        }

        const validPassword = user.comparePassword(req.body.password, user.password);

        if (!validPassword) {
          return res.error(422, 'Password was incorrect.');
        }

        const token = jsonwebtoken.sign({
          userId: user._id
        }, 'secret', {
            expiresIn: '24h'
          }); // Create a token for client


        return res.success(200, { token }, 'Success!', {
          user: {
            email: user.email
          }
        }); // Return success and token to frontend
      })
      .catch(next);
  }


  routes() {
    const loginRoute = this.router.route('/auth/login');
    loginRoute.post(this.login);
  }
}

const authenticationRoute = new AuthenticationRoute();
authenticationRoute.routes();

export default authenticationRoute.router;
