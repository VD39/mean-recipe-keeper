// Import dependencies
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';

// Import modules
import { MaterialModule } from './material.module';
import { RoutesModule } from './routes/routes.module';

// Import services
import { FormService } from './services/form.service';
import { AuthGuard } from './guards/auth-guard.service';
import { RecipeService } from './services/recipe.service';
import { HandleRequestService } from './services/handle-request.service';
import { AuthenticationService } from './services/authentication.service';

// Import pipes
import { TrimPipe } from './pipes/trim.pipe';

// Import components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ItemComponent } from './components/forms/item/item.component';
import { SearchComponent } from './components/search/search.component';
import { InputComponent } from './components/forms/input/input.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { RecipeComponent } from './components/recipes/recipe/recipe.component';
import { RecipesComponent } from './components/recipes/recipes/recipes.component';
import { CourseTypeComponent } from './components/course-type/course-type.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { ItemArrayComponent } from './components/forms/item-array/item-array.component';
import { RecipeFormComponent } from './components/forms/recipe-form/recipe-form.component';
import { IngredientsComponent } from './components/forms/ingredients/ingredients.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminButtonsComponent } from './components/forms/admin-buttons/admin-buttons.component';

// Scrollbar config
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    TrimPipe,
    AppComponent,
    ItemComponent,
    InputComponent,
    LoginComponent,
    RecipeComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    RecipesComponent,
    ItemArrayComponent,
    RecipeFormComponent,
    CourseTypeComponent,
    RecipeCardComponent,
    IngredientsComponent,
    AdminButtonsComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    RoutesModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
  ],
  providers: [
    AuthGuard,
    FormService,
    RecipeService,
    HandleRequestService,
    AuthenticationService,
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
