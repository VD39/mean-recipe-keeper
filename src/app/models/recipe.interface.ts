export interface IRecipe {
  "name": string;
  "intro": string;
  "main_image": string;
  "type?": number;
  "serves?": string;
  "prep_time?": string;
  "cook_time?": string;
  "total_time?": string;
  "course_type?": string;
  "directions?": string[];
  "ingredients?": IIngredients[] | IInnerIngredients[];
  "_id?": string;
}

interface IInnerIngredients {
  "quantity": string;
  "ingredient": string;
}

interface IIngredients {
  "for": string;
  "ingredients": IInnerIngredients[];
}
