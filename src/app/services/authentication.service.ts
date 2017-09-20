import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { IUser } from "../models/user.interface";

@Injectable()
export class AuthenticationService {

  authToken: string;

  constructor(
    private http: Http
  ) { }

  isLoggedIn(): boolean {
    return tokenNotExpired();
  }

  // Function to login user
  login(user: IUser): any {
    return this.http.post('/api/v1/auth/login', user)
      .map((res: Response) => res.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });
  }

  // Function to logout
  logout(): void {
    this.authToken = null; // Set token to null
    localStorage.clear(); // Clear local storage
  }

  // Function to store user's data in client local storage
  storeUserData(token: string): void {
    localStorage.setItem('token', token); // Set token in local storage
    this.authToken = token; // Assign token to be used elsewhere
  }
}
