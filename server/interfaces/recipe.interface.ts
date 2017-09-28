export interface IRecipe {
  type: number;
  name: string;
  intro: string;
  image: string;
  serves: string;
  prep_time: number;
  cook_time: number;
  total_time: number;
  course_type: string;
  date_added: Date;
  ingredients: (IForIngredients | ISingleIngredients)[];
  directions: string[];
  _id?: string;
}

interface IForIngredients {
  for: string;
  ingredients: ISingleIngredients[];
}

interface ISingleIngredients {
  quantity: string;
  ingredient: string;
}
