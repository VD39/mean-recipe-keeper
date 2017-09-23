import * as mongoose from "mongoose";

// create Recipe Schema & model
const RecipeSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: [true, 'Number field is required']
  },
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  intro: {
    type: String
  },
  image: {
    type: String,
    required: [true, 'Name field is required']
  },
  yields: {
    type: String,
    required: [true, 'Name field is required']
  },
  prep_time: {
    type: Number,
    required: [true, 'Name field is required']
  },
  cook_time: {
    type: Number,
    required: [true, 'Name field is required']
  },
  total_time: {
    type: Number
  },
  course_type: {
    type: String,
    required: [true, 'Name field is required']
  },
  date_added: {
    type: Date,
    default: Date.now
  },
  ingredients: [],
  directions: []
});

const Recipe = mongoose.model('Recipe', RecipeSchema);


export {
  Recipe
};
