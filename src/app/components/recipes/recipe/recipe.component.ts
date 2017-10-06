// Import dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

// Import services
import { RecipeService } from '../../../services/recipe.service';
import { AuthenticationService } from '../../../services/authentication.service';

// Import interfaces
import { IResponse, IRecipe } from '../../../interfaces';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})

export class RecipeComponent implements OnInit, OnDestroy {
  private subscription: Subscription; // Subscription
  public recipe: IRecipe; // Recipe
  public loading: boolean = true; // Loading status set to true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    public authenticationService: AuthenticationService
  ) {
    // Subscribed to event
    this.recipeService.event.subscribe((data: any) => {
      this.router.navigate(['/']); // Navigate to the home page
    });
  }

  ngOnInit() {
    // Check route if param is present
    this.subscription = this.route.params.subscribe((params) => {
      // Fetch recipe based on the Id
      const subscription = this.recipeService.getRecipe(params['id']).subscribe(
        (data: IResponse) => {
          this.loading = false; // Set loading to false
          // Check if status was success and count is greater than 0
          if (data.status === 'success' && data.meta.count > 0) {
            this.recipe = data.data; // Set recipes to data array
          } else {
            this.recipe = null; // Set recipe to null
          }
        },
        (error: IResponse | any) => {
          this.loading = false; // Set loading to false
          this.recipe = null; // Set recipe to null
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe from subscription
  }

  /**
   * Converts minutes to hour and minutes.
   * @param minutes {number} - Minutes to convert.
   */
  convertMinsToHrsMins(minutes: number): string {
    let h: any = Math.floor(minutes / 60); // Set hours
    let m: any = minutes % 60; // Set minutes
    h = h < 10 ? `0${h}` : h; // Set hours
    m = m < 10 ? `0${m}` : m; // Set minutes
    return `${h}:${m}`; // Return hour and minutes
  }
}
