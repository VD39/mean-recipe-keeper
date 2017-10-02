export interface ICourseType {
  type: string;
}

export interface IFields {
  type: (number | string)[];
  name: string[];
  image: string[];
  serves: (number | string)[];
  prep_time: (number | string)[];
  cook_time: (number | string)[];
  course_type: string[];
  directions: (string | string[])[];
  ingredients: (string | (IForIngredients | ISingleIngredients)[])[];
}

export interface IRecipe {
  type: number;
  name: string;
  intro: string;
  image: string;
  serves: number;
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

export interface IUser {
  email: string;
  password: string;
}

export interface IErrors {
  field: string;
  message: string;
}
