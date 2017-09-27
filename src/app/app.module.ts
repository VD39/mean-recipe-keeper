import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RecipeService } from "./services/recipe.service";
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuard } from "./guards/auth-guard.service";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecipesRoutesModule } from "./routes/routes.module";
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { RecipesComponent } from './components/recipes/recipes/recipes.component';
import { RecipeComponent } from './components/recipes/recipe/recipe.component';
import { TrimPipe } from './pipes/trim.pipe';
import { RecipeFormComponent } from './components/forms/recipe-form/recipe-form.component';
import { IngredientsComponent } from './components/forms/ingredients/ingredients.component';
import { ItemArrayComponent } from './components/forms/item-array/item-array.component';
import { InputComponent } from './components/forms/input/input.component';
import { ItemComponent } from './components/forms/item/item.component';
import { CourseTypeComponent } from './components/course-type/course-type.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { FormService } from './services/form.service';
import { SearchComponent } from './components/search/search.component';
import { AdminButtonsComponent } from './components/forms/admin-buttons/admin-buttons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";





import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AdminComponent,
    RecipesComponent,
    RecipeComponent,
    RecipeFormComponent,
    IngredientsComponent,
    ItemArrayComponent,
    ItemComponent,
    TrimPipe,
    InputComponent,
    CourseTypeComponent,
    RecipeCardComponent,
    SearchComponent,
    AdminButtonsComponent
  ],
  imports: [
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutesModule
  ],
  providers: [
    RecipeService,
    AuthenticationService,
    FormService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
