import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import { IResponse } from "../models/response.interface";
import { IRecipe } from '../models/recipe.interface';

@Injectable()
export class RecipeService {
  constructor(
    private http: Http
  ) { }

  getRecipes(fields: string): Observable<IResponse> {
    return this.http
      .get(`./api/v1/recipes?fields=${fields}`)
      .map((response) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });
  }

  getRecipe(id: string): Observable<IResponse> {
    return this.http
      .get(`./api/v1/recipe/${id}`)
      .map((response) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });
  }

  addRecipe(recipe: IRecipe) {
    return this.http
      .post('./api/v1/recipes', recipe)
      .map((response: any) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });;
  }

  getCourseTypes() {
      return this.http
        .get('./api/v1/coursetypes')
        .map((response: any) => response.json())
        .catch((err: Response) => {
          const details = err.json();
          return Observable.throw(details);
        });;
    }
}
