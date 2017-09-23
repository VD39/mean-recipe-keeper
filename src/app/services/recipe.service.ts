import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import { IResponse } from "../models/response.interface";
import { IRecipe } from '../models/recipe.interface';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  public recipeSubject = new Subject<any>();
  public event = this.recipeSubject.asObservable();

  constructor(
    private http: Http,
    private router: Router
  ) { }

  getRecipes(fields: string, limit: number = 0, coursetype: string = ''): Observable<IResponse> {
    return this.http
      .get(`./api/v1/recipes?fields=${fields}&limit=${limit}&coursetype=${coursetype}`)
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

  addRecipe(recipe: IRecipe): Observable<IResponse> {
    return this.http
      .post('./api/v1/recipes', recipe)
      .map((response: any) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });;
  }

  editRecipe(id: string, recipe: IRecipe): Observable<IResponse> {
    return this.http
      .put(`./api/v1/recipe/${id}`, recipe)
      .map((response: any) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });;
  }

  deleteRecipe(id: string): void {
    if (window.confirm('Are you sure')) {
      this.http
        .delete(`./api/v1/recipe/${id}`)
        .map((response: any) => response.json())
        .subscribe(
          (data) => {
            this.recipeSubject.next({ id });
          },
          (error) => {
            console.log(error);
          }
        )
    }
  }

  getCourseTypes(): Observable<IResponse> {
    return this.http
      .get('./api/v1/coursetypes')
      .map((response: any) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });;
  }

  searchRecipes(searchTerm: string, fields: string = ''): Observable<IResponse> {
    return this.http
      .get(`./api/v1/recipes?search=${searchTerm}&fields=${fields}`)
      .map((response) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });
  }
}
