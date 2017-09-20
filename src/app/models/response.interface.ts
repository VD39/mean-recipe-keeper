import {
  IRecipe
} from "./recipe.interface";

export interface IResponse {

    status: string;
    data: IRecipe[];
    meta: Object;
    message: string[];
//  |
//     status: string;
//     data: IRecipe[];
//     meta: Object;
//     message: string[];


}


// // ({
// //   "type": string;
// //   "name": string;
// //   "intro": string;
// //   "main_image": string;
// //   "yields": string;
// //   "prep_time": string;
// //   "cook_time": string;
// //   "total_time": string;
// //   "dish_type": string;
// //   "course_type": string;
// //   "ingredients": {
// //     "for": string;
// //     "ingredients": string[];
// //   }[];
// //   "method": string[];
// // } | {
// //   "type": string;
// //   "name": string;
// //   "intro": string;
// //   "main_image": string;
// //   "yields": string;
// //   "prep_time": string;
// //   "cook_time": string;
// //   "total_time": string;
// //   "dish_type": string;
// //   "course_type": string;
// //   "ingredients": string[];
// //   "method": string[];
// // })[];
