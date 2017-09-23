import { Router, Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import { Recipe } from '../models/recipe';
import { checkRequiredFields } from '../middleware';

export class RecipeRoute {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getRecipes(req: Request, res: Response, next: NextFunction) {
    let projection;
    let find = {};

    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 0;

    if (req.query.fields) {
      projection = req.query.fields.split(',').reduce((object, field) => {
        object[field.trim()] = true;
        return object;
      }, {});
    }

    if (req.query.coursetype) {
      find = {
        course_type: req.query.coursetype
      };
    }


    Recipe
      .find(find, projection)
      .sort({
        date_added: -1
      })
      .limit(limit)
      .then((recipes) => {
        res.success(200, recipes, null, {
          count: recipes.length
        });
      })
      .catch(next);
  }

  public getRecipe(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (!id) {
      return res.error(400, 'No recipe ID was provided.'); // Return error message
    }

    if (mongoose.Types.ObjectId.isValid(id)) {
      Recipe
        .findOne({
          _id: mongoose.Types.ObjectId(id)
        })
        .then((recipe) => {
          if (!recipe) {
            return res.error(400, `No recipe with the ID ${id} was found.`); // Return error message
          }
          return res.success(200, recipe); // Return error message
        })
        .catch(next);
    } else {
      return res.error(400, `The ID ${id}, is not a valid ID.`); // Return error message
    }
  }

  public addRecipe(req: Request, res: Response, next: NextFunction) {
    const requiredFields = {
      type: [req.body.type, 'Type is required.'],
      name: [req.body.name, 'Name is required.'],
      image: [req.body.image, 'Image is required.'],
      prep_time: [req.body.prep_time, 'Prep Time is required.'],
      cook_time: [req.body.cook_time, 'Cook Time is required.'],
      course_type: [req.body.course_type, 'Course Type is required.'],
      directions: [req.body.directions, 'Directions is required.'],
      ingredients: [req.body.ingredients, 'Ingredients is required.']
    };

    const errors = checkRequiredFields(requiredFields);

    if (req.body.type < 0 || req.body.type > 1) {
      errors.unshift({
        field: 'type',
        message: 'Type is not correct, must be either 0 or 1.'
      });
    }

    if (errors.length > 0) {
      return res.error(400, errors); // Return error message
    } else {
      req.body.total_time = parseInt(req.body.prep_time, 10) + parseInt(req.body.cook_time, 10);
      Recipe
        .create(req.body)
        .then((recipe) => {
          res.success(201, recipe, 'Recipe added successfully.');
        })
        .catch(next);
    }
  }

  public updateRecipe(req: Request, res: Response, next: NextFunction) {
    Recipe
      .findByIdAndUpdate({
        _id: req.params.id
      }, req.body)
      .then(() => {
        Recipe.findOne({
          _id: req.params.id
        })
          .then((recipe) => {
            res.send(recipe);
          });
      })
      .catch(next);
  }

  public deleteRecipes(req: Request, res: Response, next: NextFunction) {
    Recipe
      .findByIdAndRemove({
        _id: req.params.id
      })
      .then((recipe) => {
        res.send(recipe);
      })
      .catch(next);
  }

  routes() {
    const recipesRoute = this.router.route('/recipes');
    const recipeIdRoute = this.router.route('/recipe/:id');

    recipesRoute.get(this.getRecipes);
    recipesRoute.post(this.addRecipe);
    recipeIdRoute.get(this.getRecipe);
    recipeIdRoute.put(this.updateRecipe);
    recipeIdRoute.delete(this.deleteRecipes);

  }
}

const recipeRoute = new RecipeRoute();
recipeRoute.routes();

export default recipeRoute.router;
