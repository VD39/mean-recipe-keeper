import {
  Component,
  OnInit
} from '@angular/core';
import {
  RecipeService
} from "../../../services/recipe.service";
import {
  AuthenticationService
} from '../../../services/authentication.service';
import {
  IRecipe
} from '../../../models/recipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  loggedIn: boolean;
  recipes: IRecipe[];

  constructor(
    private authenticationService: AuthenticationService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.loggedIn = this.authenticationService.isLoggedIn();
    this.recipeService.getRecipes('_id,name,image,intro,course_type').subscribe(
      (data) => {
        if (data.status === 'success') {
          this.recipes = data.data;
        }
      },
      (error) => {
        console.log(error);
      });
  }

}
