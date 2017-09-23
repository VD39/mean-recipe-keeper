import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../services/authentication.service";
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  courseTypes: any;

  constructor(
    private recipeService: RecipeService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeService.getCourseTypes().subscribe(
      (data) => {
        this.courseTypes = data.data;
      },
      (error) => {
        this.courseTypes = [];
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
