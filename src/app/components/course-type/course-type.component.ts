// Import dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// Import services
import { RecipeService } from '../../services/recipe.service';

// Import interfaces
import { IResponse, IRecipe } from '../../interfaces';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.css']
})

export class CourseTypeComponent implements OnInit, OnDestroy {
  private subscription: Subscription; // Subscription
  public loading: boolean = true; // Loading state set to false
  public recipes: IRecipe[]; // Recipes

  constructor(
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
      // Fetch recipes based on the course type
      const subscription = this.recipeService.getRecipes('_id,name,image,intro,course_type', 0, params['courseType']).subscribe(
        (data: IResponse) => {
          this.loading = false; // Set loading to false
          // Check if status was success and count is greater than 0
          if (data.status === 'success' && data.meta.count > 0) {
            this.recipes = data.data; // Set recipes to data array
          } else {
            this.recipes = []; // Set empty array
          }
        },
        (error: IResponse | any) => {
          this.loading = false; // Set loading to false
          this.recipes = []; // Set empty array
        });
      // this.subscription.add(subscription); // Add subscription
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe from subscription
  }
}
