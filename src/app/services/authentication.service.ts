// Import dependencies
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';

// Import services
import { HandleRequestService } from './handle-request.service';

// Import interfaces
import { IResponse, IUser } from '../interfaces';

@Injectable()
export class AuthenticationService extends HandleRequestService {
  authToken: string; // Authentication token

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  /**
   * Checks if user is logged in or not.
   */
  public isLoggedIn(): boolean {
    return tokenNotExpired(); // Return tokenNotExpired
  }

  /**
   * Post method to log user in.
   * @param user {IUser} - User object.
   */
  public login(user: IUser): Observable<IResponse> {
    // Return request
    return this.httpClient
      .post('/api/v1/auth/login', user)
      .catch(this.handleError);
  }

  /**
   * Logs out user and clears local storage.
   */
  public logout(): void {
    this.authToken = null; // Set token to null
    localStorage.clear(); // Clear local storage
  }

  /**
   * Stores user's data in client local storage.
   * @param token {string} - Authentication token.
   */
  public storeUserData(token: string): void {
    localStorage.setItem('token', token); // Set token in local storage
    this.authToken = token; // Assign token to be used elsewhere
  }
}
