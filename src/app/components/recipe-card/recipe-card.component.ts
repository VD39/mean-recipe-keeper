import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IRecipe } from '../../models/recipe.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  host: { 'class': 'ui card' },
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {

  constructor(
    private recipeService: RecipeService,
    private authenticationService: AuthenticationService
  ) { }

  @Input()
  recipe: IRecipe;

  @Output()
  delete = new EventEmitter();
}
