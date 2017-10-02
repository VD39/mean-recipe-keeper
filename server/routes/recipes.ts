// Import dependencies
import { Router, Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

// Import models
import { Recipe } from '../models/recipe';

// Import interfaces
import { IFields, IErrors } from '../interfaces';

export class RecipeRoute {
  router: Router; // Express router

  constructor() {
    this.router = Router(); // Set express router
    this.routes(); // Call routes
  }

  /**
   * Gets all recipes.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public getRecipes(req: Request, res: Response, next: NextFunction): void | Response {
    let projection: object = {}; // Projection object
    const find: object = {}; // Find object

    const limit: number = req.query.limit ? parseInt(req.query.limit, 10) : 0; // Set limit

    // Set projection if fields are set within query
    if (req.query.fields) {
      projection = req.query.fields.split(',').reduce((object, field) => {
        object[field.trim()] = true;
        return object;
      }, projection);
    }

    // Set course type if coursetype is set within query
    if (req.query.coursetype) {
      find['course_type'] = req.query.coursetype; // Set course type
    }

    // Set search for name field if search is set within query
    if (req.query.search) {
      find['name'] = {
        '$regex': req.query.search,
        '$options': 'i'
      }; // Set search query
    }

    Recipe
      .find(find, projection)
      .sort({
        date_added: -1
      })
      .limit(limit)
      .then((recipes) => {
        // Send success message and recipes
        res.success(200, recipes, `Found ${recipes.length} recipes`, {
          count: recipes.length
        });
      })
      .catch(next); // Catch the error using next middleware
  }

  /**
   * Get recipe using ID.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public getRecipe(req: Request, res: Response, next: NextFunction): void | Response {
    const id: string = req.params.id; // Param id

    // Check if Id is set
    if (!id) {
      return res.error(400, 'No recipe ID was provided.'); // Return and send error message
    }

    // Check id is valid
    if (Types.ObjectId.isValid(id)) {
      Recipe
        .findOne({
          _id: Types.ObjectId(id)
        })
        .then((recipe) => {
          if (!recipe) {
            // Return and send success message and send recipe even if null
            return res.success(200, recipe, `No recipe with the ID ${id} was found.`, {
              count: 0
            });
          }
          // Send success message and send recipe
          res.success(200, recipe, `Recipe with the ID ${id} found.`, {
            count: 1
          });
        })
        .catch(next); // Catch the error using next middleware
    } else {
      res.error(400, `The ID ${id}, is not a valid ID.`); // Send error message
    }
  }

  /**
   * Add recipe to database.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public addRecipe(req: Request, res: Response, next: NextFunction): void | Response {
    // Check if there a response body
    if (!Object.keys(req.body).length) {
      return res.error(400, 'No fields were set.'); // Return and send error message
    }

    const errors: IErrors[] = res.checkRequiredFields(req.body); // Sets errors

    // Check error length
    if (errors.length > 0) {
      return res.error(400, errors); // Return and send error message
    }

    // Set body total time
    req.body.total_time = parseInt(req.body.prep_time, 10) + parseInt(req.body.cook_time, 10);

    Recipe
      .create(req.body)
      .then((recipe) => {
        // Send success message and created recipe
        res.success(200, recipe, 'Recipe added successfully.');
      })
      .catch(next); // Catch the error using next middleware
  }

  /**
   * Updates recipe.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public updateRecipe(req: Request, res: Response, next: NextFunction): void | Response {
    // Check if there a response body
    if (!Object.keys(req.body).length) {
      return res.error(400, 'No fields were set.'); // Return and send error message
    }

    const errors: IErrors[] = res.checkRequiredFields(req.body); // Sets errors

    // Check error length
    if (errors.length > 0) {
      return res.error(400, errors); // Return and send error message
    }

    // Set body total time
    req.body.total_time = parseInt(req.body.prep_time, 10) + parseInt(req.body.cook_time, 10);

    Recipe
      .findByIdAndUpdate({
        _id: req.params.id
      }, req.body)
      .then(() => {
        Recipe.findOne({
          _id: req.params.id
        })
          .then((recipe) => {
            // Send success message and updated recipe
            res.success(201, recipe, 'Recipe updated successfully.');
          });
      })
      .catch(next); // Catch the error using next middleware
  }

  /**
   * Deletes Recipe.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public deleteRecipe(req: Request, res: Response, next: NextFunction): void | Response {
    Recipe
      .findByIdAndRemove({
        _id: req.params.id
      })
      .then((recipe) => {
        // Send success message
        res.success(204);
      })
      .catch(next); // Catch the error using next middleware
  }

  /**
   * Authentication routes.
   */
  public routes(): void {
    const recipesRoute: Router = this.router.route('/recipes'); // Set route
    recipesRoute.get(this.getRecipes); // Get method for recipesRoute
    recipesRoute.post(this.addRecipe); // Post method for recipesRoute

    const recipeIdRoute: Router = this.router.route('/recipe/:id'); // Set route
    recipeIdRoute.get(this.getRecipe); // Get method for recipeIdRoute
    recipeIdRoute.put(this.updateRecipe); // Put method for recipeIdRoute
    recipeIdRoute.delete(this.deleteRecipe); // Delete method for recipeIdRoute
  }
}

const recipeRoute: RecipeRoute = new RecipeRoute();
recipeRoute.routes();

// Export
export default recipeRoute.router;
