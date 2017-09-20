import { Component } from '@angular/core';
import { RecipeService } from "./services/recipe.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  recipes: any;
  constructor(private recipeService: RecipeService) {
    // RecipeService.getRecipes().subscribe(data => {
    //   console.log(data);
    //   this.recipes = data;
    // });
  }
}
