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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
  noRecipe: boolean = true;
  recipe: IRecipe | IRecipe[];
  id: number;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

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

  convertMinsToHrsMins(minutes) {
    let h: any = Math.floor(minutes / 60);
    let m: any = minutes % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m;
  }




}
