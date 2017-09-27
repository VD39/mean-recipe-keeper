import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/recipe.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  loading: boolean = true;
  noResult: boolean = false;
  recipes: IRecipe[];
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        const searchTerm = params['value'];
        if (searchTerm) {
          this.recipeService.searchRecipes(searchTerm, '_id,name,image,intro,course_type').subscribe(
            (data) => {
              this.loading = false;
              if (data.status === 'success' && data.meta.count > 0) {
                this.recipes = data.data;
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
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
