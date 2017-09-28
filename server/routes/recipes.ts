// Import dependencies
import { Router, Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

// Import middleware
import { checkRequiredFields } from '../middleware';

// Import models
import { Recipe } from '../models/recipe';

// Import interfaces
import { IFields } from '../interfaces/fields.interface';

export class RecipeRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * Gets all recipes.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public getRecipes(req: Request, res: Response, next: NextFunction): void | Response {
    let projection: object = {};
    let find: object = {};

    // Set limit
    const limit: number = req.query.limit ? parseInt(req.query.limit, 10) : 0;

    // Set projection if fields are set within query
    if (req.query.fields) {
      projection = req.query.fields.split(',').reduce((object, field) => {
        object[field.trim()] = true;
        return object;
      }, projection);
    }

    // Set course type if coursetype is set within query
    if (req.query.coursetype) {
      find['course_type'] = req.query.coursetype;
    }

    // Set search for name field if search is set within query
    if (req.query.search) {
      find['name'] = {
        '$regex': req.query.search,
        '$options': 'i'
      };
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
    if (!id) {
      // Return and send error message
      return res.error(400, 'No recipe ID was provided.');
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
      // Send error message
      res.error(400, `The ID ${id}, is not a valid ID.`);
    }
  }

  /**
   * Add recipe to database.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public addRecipe(req: Request, res: Response, next: NextFunction): void | Response {
    const requiredFields: IFields = {
      type: [req.body.type, 'Type is required.'],
      name: [req.body.name, 'Name is required.'],
      image: [req.body.image, 'Image is required.'],
      serves: [req.body.serves, 'Serves total is required.'],
      prep_time: [req.body.prep_time, 'Prep Time is required.'],
      cook_time: [req.body.cook_time, 'Cook Time is required.'],
      course_type: [req.body.course_type, 'Course Type is required.'],
      directions: [req.body.directions, 'Directions is required.'],
      ingredients: [req.body.ingredients, 'Ingredients is required.']
    };

    // Sets errors
    const errors: object[] = checkRequiredFields(requiredFields);

    // Check type is 0 or 1
    if (req.body.type < 0 || req.body.type > 1) {
      errors.unshift({
        field: 'type',
        message: 'Type is not correct, must be either 0 or 1.'
      });
    }

    // Check error length
    if (errors.length > 0) {
      // Return and send error message
      return res.error(400, errors);
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
    const recipesRoute: Router = this.router.route('/recipes');
    recipesRoute.get(this.getRecipes);
    recipesRoute.post(this.addRecipe);

    const recipeIdRoute: Router = this.router.route('/recipe/:id');
    recipeIdRoute.get(this.getRecipe);
    recipeIdRoute.put(this.updateRecipe);
    recipeIdRoute.delete(this.deleteRecipe);
  }
}

const recipeRoute: RecipeRoute = new RecipeRoute();
recipeRoute.routes();

// Export
export default recipeRoute.router;
