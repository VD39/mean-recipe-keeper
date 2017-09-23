import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from "../../../services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IRecipe } from "../../../models/recipe.interface";
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  noResult: boolean = false;
  recipe: IRecipe | IRecipe[];
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authenticationService: AuthenticationService
  ) {
    this.recipeService.event.subscribe((data) => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.recipeService.getRecipe(params['id']).subscribe(
        (data) => {
          this.loading = false;
          if (data.status === 'success' && data.meta.count > 0) {
            this.recipe = data.data;
            this.noResult = false;
          } else {
            this.noResult = true;
          }
        },
        (error) => {
          this.loading = false;
          this.noResult = true;
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
    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    return `${h}:${m}`;
  }
}
