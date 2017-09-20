import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  RecipeService
} from "../../../services/recipe.service";
import {
  ActivatedRoute
} from "@angular/router";
import {
  IRecipe
} from "../../../models/recipe.interface";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
  noRecipe: boolean = true;
  recipe: IRecipe | IRecipe[];
  id: number;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.recipeService.getRecipe(params['id']).subscribe(
        (data) => {
          if (data.status === 'success') {
            this.noRecipe = false;
            this.recipe = data.data;
          }
        },
        (error) => {
          console.log(error);
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
