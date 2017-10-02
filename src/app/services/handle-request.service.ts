// Import dependencies
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import interfaces
import { IResponse } from '../interfaces/index';

@Injectable()
export class HandleRequestService {
  /**
   * Handles the response data.
   * @param response {Response} Response from API.
   */
  protected extractData(response: Response): IResponse {
    const body = response.json(); // Convert response to JSON
    return body || {}; // Return Body or empty object
  }

  /**
   * Handles the error response.
   * @param error {Response | any} Error Response from API.
   */
  protected handleError(error: Response): Observable<any> {
    const contentType: string = error.headers.get('Content-Type');
    let errorMassage: any;

    if (/\btext\/html\b/.test(contentType)) {
      errorMassage = {
        message: 'Something went wrong. Please try again.'
      };
    }

    if (/\bapplication\/json\b/.test(contentType)) {
      errorMassage = error.json() || '';
    }

    return Observable.throw(errorMassage);
  }
}
