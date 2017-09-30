// Import dependencies
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import services
import { AuthGuard } from '../guards/auth-guard.service';

// Import components
import { LoginComponent } from '../components/login/login.component';
import { SearchComponent } from '../components/search/search.component';
import { RecipeComponent } from '../components/recipes/recipe/recipe.component';
import { RecipesComponent } from '../components/recipes/recipes/recipes.component';
import { CourseTypeComponent } from '../components/course-type/course-type.component';
import { RecipeFormComponent } from '../components/forms/recipe-form/recipe-form.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

// Routes for the site
const ROUTES: Routes = [
  {
    path: '',
    component: RecipesComponent
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent
  },
  {
    path: 'course-type/:courseType',
    component: CourseTypeComponent
  },
  {
    path: 'search/:value',
    component: SearchComponent
  },
  {
    path: 'admin/recipes',
    component: RecipesComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'admin/recipe/add',
    component: RecipeFormComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'admin/recipe/edit/:id',
    component: RecipeFormComponent,
    canActivate: [
      AuthGuard
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutesModule { }
