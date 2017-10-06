// Import dependencies
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

// Import interfaces
import { IResponse } from '../interfaces/index';

@Injectable()
export class HandleRequestService {
  /**
   * Handles the error response.
   * @param error {Response | any} - Error Response from API.
   */
  protected handleError(error: HttpErrorResponse): Observable<any> {
    const contentType: string = error.headers.get('Content-Type'); // Set content type by getting from the response header
    let errorMassage: any; // Error message

    // Check if content type is html
    if (/\btext\/html\b/.test(contentType)) {
      // Set error message
      errorMassage = {
        message: 'Something went wrong. Please try again.'
      };
    }

    // Check if content type is json
    if (/\bapplication\/json\b/.test(contentType)) {
      errorMassage = JSON.parse(error.error); // Set error message by converting response error to json
    }

    return Observable.throw(errorMassage); // Return the error
  }
}
