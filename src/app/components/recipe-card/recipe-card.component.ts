// Import dependencies
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Import services
import { AuthenticationService } from '../../services/authentication.service';
import { RecipeService } from '../../services/recipe.service';

// Import interfaces
import { IRecipe } from '../../interfaces';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})

export class RecipeCardComponent {
  constructor(
    private recipeService: RecipeService,
    public authenticationService: AuthenticationService
  ) { }

  @Input()
  public recipe: IRecipe; // Recipe
}
