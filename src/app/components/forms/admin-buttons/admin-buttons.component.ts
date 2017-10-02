// Import dependencies
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Import services
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-admin-buttons',
  templateUrl: './admin-buttons.component.html',
  styleUrls: ['./admin-buttons.component.css']
})

export class AdminButtonsComponent {
  constructor(
    public recipeService: RecipeService
  ) { }

  @Input()
  public id: string;
}
