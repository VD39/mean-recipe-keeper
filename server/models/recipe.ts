// Import dependencies
import { Schema, Document, Model, model } from "mongoose";

// Import interface
import { IRecipe } from "../interfaces/recipe.interface";

// Create recipe schema
const RecipeSchema: Schema = new Schema({
  type: {
    type: Number,
    required: [true, 'Number field is required.']
  },
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  intro: {
    type: String
  },
  image: {
    type: String,
    required: [true, 'Image field is required.']
  },
  serves: {
    type: String,
    required: [true, 'Serves field is required.']
  },
  prep_time: {
    type: Number,
    required: [true, 'Prep time field is required.']
  },
  cook_time: {
    type: Number,
    required: [true, 'Cook time field is required.']
  },
  total_time: {
    type: Number
  },
  course_type: {
    type: String,
    required: [true, 'Course type field is required.']
  },
  date_added: {
    type: Date,
    default: Date.now
  },
  ingredients: {
      type: Schema.Types.Mixed,
      required: [true, 'Ingredient field is required.']
  },
  directions: {
    type: [],
    required: [true, 'Directions field is required.']
  }
});


interface IRecipeModel extends IRecipe, Document { }

// Course type model
const Recipe: Model = model<IRecipeModel>('Recipe', RecipeSchema);

// Export
export { Recipe };
