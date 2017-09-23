import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from '../../models/recipe.interface';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.css']
})
export class CourseTypeComponent implements OnInit {
  loggedIn: boolean;
  noneFound: boolean = true;
  recipes: IRecipe[];
  noRecipes: boolean = true;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.loggedIn = this.authenticationService.isLoggedIn();
    this.sub = this.route.params.subscribe(params => {
      this.recipeService.getRecipes('_id,name,image,intro,course_type', 0, params['courseType']).subscribe(
        (data) => {
          if (data.status === 'success' && data.meta.count > 0) {
            this.noneFound = false;
            this.noRecipes = false;
            this.recipes = data.data;
          }
        },
        (error) => {
          console.log(error);
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
