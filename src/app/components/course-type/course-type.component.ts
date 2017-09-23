import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from '../../models/recipe.interface';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.css']
})
export class CourseTypeComponent implements OnInit {
  loading: boolean = true;
  noResult: boolean = false;
  recipes: IRecipe[];
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.recipeService.event.subscribe((data) => {
      this.recipes = this.recipes.filter((recipe) => recipe._id !== data.id);
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.recipeService.getRecipes('_id,name,image,intro,course_type', 0, params['courseType']).subscribe(
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
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
