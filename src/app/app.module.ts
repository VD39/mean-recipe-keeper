import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RecipeService } from "./services/recipe.service";
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuard } from "./guards/auth-guard.service";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecipesRoutesModule } from "./routes/routes.module";
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { RecipesComponent } from './components/recipes/recipes/recipes.component';
import { RecipeComponent } from './components/recipes/recipe/recipe.component';
import { RecipeFormComponent } from './components/recipes/recipe-form/recipe-form.component';
import { IngredientsComponent } from "./components/recipes/recipe-form/ingredients/ingredients.component";
import { ItemArrayComponent } from "./components/recipes/recipe-form/item-array/item-array.component";
import { ItemComponent } from "./components/recipes/recipe-form/item/item.component";
import { TrimPipe } from './pipes/trim.pipe';
import { InputComponent } from './components/recipes/recipe-form/input/input.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    InputComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RecipesRoutesModule
  ],
  providers: [
    RecipeService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
