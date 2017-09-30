export interface ICourseType {
  _id?: string;
  type: string;
}

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
  ingredients: (IIngredientFor | IIngredientSingle)[];
  directions: string[];
  _id?: string;
}

export interface IIngredientSingle {
  quantity: string;
  ingredient: string;
}

export interface IIngredientFor {
  for: string;
  ingredients: IIngredientSingle[];
}

export interface IResponse {
  status: string;
  data: any;
  meta?: any;
  message?: string;
}

export interface IUser {
  email: string;
  password: string;
}
