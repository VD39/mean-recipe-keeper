import { Component, Input } from '@angular/core';
import { IRecipe } from '../../models/recipe.interface';

@Component({
  selector: 'app-recipe-card',
  host: {'class': 'ui card'},
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input()
  loggedIn: boolean;

  @Input()
  recipe: IRecipe;
}
