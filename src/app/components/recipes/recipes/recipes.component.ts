import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../../../services/recipe.service";
import { IRecipe } from '../../../models/recipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  loading: boolean = true;
  noResult: boolean = false;
  recipes: IRecipe[];

  constructor(
    private recipeService: RecipeService
  ) {
    this.recipeService.event.subscribe((data) => {
      this.recipes = this.recipes.filter((recipe) => recipe._id !== data.id);
    });
  }

  ngOnInit() {
    this.recipeService.getRecipes('').subscribe(
      (data) => {
        this.loading = false;
        if (data.status === 'success' && data.meta.count > 0) {
          this.recipes = data.data;
          this.noResult = false;
        } else {
          this.noResult = true;
        }
      },
      (error) => {
        this.loading = false;
        this.noResult = true;
        console.log(error);
      });
  }

}
