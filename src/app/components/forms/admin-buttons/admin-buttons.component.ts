import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-admin-buttons',
  templateUrl: './admin-buttons.component.html',
  styleUrls: ['./admin-buttons.component.css']
})
export class AdminButtonsComponent {

  constructor(
    private recipeService: RecipeService
  ) { }

  @Input()
  id: string;

}
