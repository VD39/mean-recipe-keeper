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
  ingredients: (string | {
    for: string;
    ingredient: string[];
  })[],
  directions: string[]
};

