import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from "../guards/auth-guard.service";

import { LoginComponent } from "../components/login/login.component";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";
import { RecipesComponent } from "../components/recipes/recipes/recipes.component";
import { RecipeComponent } from "../components/recipes/recipe/recipe.component";
import { AdminComponent } from "../components/admin/admin.component";
import { RecipeFormComponent } from '../components/forms/recipe-form/recipe-form.component';
import { CourseTypeComponent } from '../components/course-type/course-type.component';
import { SearchComponent } from '../components/search/search.component';

const recipesRoutes: Routes = [
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
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      AuthGuard
    ]
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
    component: LoginComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(recipesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RecipesRoutesModule { }
