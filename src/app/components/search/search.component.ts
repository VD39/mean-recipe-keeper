// Import dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

// Import services
import { RecipeService } from '../../services/recipe.service';

// Import interfaces
import { IResponse, IRecipe } from '../../interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, OnDestroy {
  private subscription: Subscription; // Subscription
  public recipes: IRecipe[]; // Recipes
  public loading: boolean = true; // Loading status set to true
  public noResult: boolean = false; // Loading status set to false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    // Subscribed to event
    this.recipeService.event.subscribe((data: any) => {
      this.recipes = this.recipes.filter((recipe) => recipe._id !== data.id); // Remove delete item
    });
  }

  ngOnInit() {
    // Check route if param is present
    this.subscription = this.route.params.subscribe((params) => {
      const searchTerm = params['value']; // Search term
      // Check if search term has value
      if (searchTerm) {
        // Fetch recipes based on the search term
        const subscription = this.recipeService.searchRecipes(searchTerm, '_id,name,image,intro,course_type').subscribe(
          (data: IResponse) => {
            this.loading = false; // Set loading to false
            // Check if status was success and count is greater than 0
            if (data.status === 'success' && data.meta.count > 0) {
              this.recipes = data.data; // Set recipes to data array
              this.noResult = false; // Set no results to false
            } else {
              this.noResult = true; // Set no results to true
            }
          },
          (error: IResponse | any) => {
            this.loading = false; // Set loading to false
            this.noResult = true; // Set no results to true
          });
        // this.subscription.add(subscription); // Add subscription
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe from subscription
  }
}
