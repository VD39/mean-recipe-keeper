// Import dependencies
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

// Import services
import { HandleRequestService } from './handle-request.service';

// Import interfaces
import { IResponse, IRecipe } from '../interfaces';

@Injectable()
export class RecipeService extends HandleRequestService {
  public recipeSubject: Subject<any> = new Subject<any>();
  public event: Observable<any> = this.recipeSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    super();
  }

  /**
   * Gets the recipes based on paramaters.
   * @param fields {string} - Fields to return from API.
   * @param limit {number} - Limit of return results.
   * @param coursetype {string} - Course types.
   */
  public getRecipes(fields: string, limit: number = 0, coursetype: string = ''): Observable<IResponse> {
    return this.httpClient
      .get<IResponse>(`./api/v1/recipes?fields=${fields}&limit=${limit}&coursetype=${coursetype}`)
      .catch(this.handleError);
  }

  /**
   * Gets the recipe via ID.
   * @param id {string} - Id of the recipe.
   */
  public getRecipe(id: string): Observable<IResponse> {
    return this.httpClient
      .get<IResponse>(`./api/v1/recipe/${id}`)
      .catch(this.handleError);
  }

  /**
   * Add recipe to the database.
   * @param recipe {IRecipe} - Recipe object.
   */
  public addRecipe(recipe: IRecipe): Observable<IResponse> {
    return this.httpClient
      .post<IResponse>('./api/v1/recipes', recipe)
      .catch(this.handleError);
  }

  /**
   * Edits the recipe.
   * @param id {string} - Id of the recipe.
   * @param recipe {IRecipe} - Recipe object.
   */
  public editRecipe(id: string, recipe: IRecipe): Observable<IResponse> {
    return this.httpClient
      .put<IResponse>(`./api/v1/recipe/${id}`, recipe)
      .catch(this.handleError);
  }

  /**
   * Deletes the recipe from the database.
   * @param id {string} - Id of the recipe.
   */
  public deleteRecipe(id: string): void {
    // TODO: Change this dirty hack to use material design alert
    if (window.confirm('Are you sure')) {
      this.httpClient
        .delete(`./api/v1/recipe/${id}`)
        .subscribe(
        (data: IResponse) => {
          this.recipeSubject.next({ id }); // Send Id
        },
        (error: IResponse | any) => {
          console.log(error); // Log error
        }
        );
    }
  }

  /**
   * Gets the course types.
   */
  public getCourseTypes(): Observable<IResponse> {
    return this.httpClient
      .get<IResponse>('./api/v1/coursetypes')
      .catch(this.handleError);
  }

  /**
   * Search for recipe.
   * @param searchTerm {string} - Search term.
   * @param fields {string} - Fields to return.
   */
  public searchRecipes(searchTerm: string, fields: string = ''): Observable<IResponse> {
    return this.httpClient
      .get<IResponse>(`./api/v1/recipes?search=${searchTerm}&fields=${fields}`)
      .catch(this.handleError);
  }
}
