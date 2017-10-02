// Import dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

// Import services
import { FormService } from '../../../services/form.service';
import { RecipeService } from '../../../services/recipe.service';

// Import interfaces
import { IResponse, IRecipe, ICourseType, IIngredientFor, IIngredientSingle } from '../../../interfaces';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})

export class RecipeFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription; // Subscription
  private recipeId: string; // Recipe Id
  private edit: boolean = false; // Edit status set to false
  public buttonText: string = 'Add Recipe';
  public recipeForm: FormGroup; // Recipe form group
  public image: FormControl; // Image form control
  public directions: FormArray; // Directions form array
  public ingredients: FormArray; // Ingredients form array
  public recipe: IRecipe; // Recipe
  public courseTypes: ICourseType; // Course types
  public errorMessage: any; // Error message
  public loading: boolean = true; // Loading status set to true
  public error: boolean = false; // Error status set to false
  /* tslint:disable:max-line-length */
  public defaultImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAMcAQMAAACl5F6MAAAABlBMVEW8vsDn6OnyCdevAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEbUlEQVR4AezBMQEAAADCoPVP7WsIoAcAAAAAAAAAAAAAAAAAAAAAAIydO0iOk4eCAGyVXNEuukF0FB1NHE1H0RG0ZEHRf5A99WYMk1T+Kvolw+vVjBf+CkMLoRCFWQkuqCquB3QOOQKrCpwBKJ1i6Jxk/EzTubaArgAHQOeyjhu8aMEafUrYolLjLRMfLrpw5cMYadeBnTLcrwN7ZXi+DhyuCi8GG/xy8Gyw3SRe7n7cLzfnajah5z87keFJ//lYf0WAAq+vv+rDX+fir+zpr2Xqr95qrle/ywr9OxX+/nF19fGRmR/yrzCJCudRqNHiNDHhIlquTBgCF2aX3V2BwYT9nUYdNoNojnqjiKJ56q0xiRaok4EsWqQO2EW0RJ3wQbTMvDc6iFaYswEvkx5Hnf8E0Tx1xhcfj3gh1lhOLHVWnx8vLvBq/FAnYpGBhwEElVfjhyETjVjj5bFanATpLrHIcpDkIstpJRdZLmRykaW63CLLMZKLLGeVXGS5jvlFluZKq8k1lnGMXGMZuck1lnsVu8ZydybXWOYj5BrLDIxcY5lz8mrML/JupPIC02osf3tyjeVqY9dYikys8QlTAUIsFovFYrFYLJaIP8hq8D4GG2ywwQYbbLDBBhtssMEGG2ywwQYb3N9+G/ePwQYbbLDBBhtssMEGG5yhA3ugqcARmFXgDKwqcAGgAsu+J1zYy94UXDjIRxosH+crwUm2euHCWX43Fy7YciUYI9N1YIeRavDpsMdIM9jgs+BOh4PBavA3ras6aMFRC06TEpyrLsy/H5emBKOrwvxZpsOsA3ssOk8SQQ9edZ4WI6DzfJwU4Ym/FCE7ofFXfQoJlnUugRsHdl9GTKBzlxRF6vzVW9kngr5eLTB5hT6MUhPgLfdDRhwQCQ79TQXe756tAWcp10XgIuMYF8aWxoedLtz5sB/wzIeDLrzw4QiRqHBSgOvnwLWFCrc7eCLCbnwrXFh2ZMdHKhEOyx3ciHBch8OHE2TtCZ0IZ0wCz1S4jhGTDhc0ecN9IcLja/qEVwIswqwC+/H3zfgMDw7j95cbPBFg+YEKnIaGWyoNzpvmcEujws0rwGX7LnCnwWOgDLhlZsFuaJEP+zFCC7yw4DCAhFtWFhwHl/lwwpeowRMJzlpw+QpXEgwl2O3gxoH9Du4cOOzgmQNHLTjt4OXF4byDVw5csAsHhhLssM/EgD32qQw4aMER+zQtuDPgpAVn7DMz4IJ9FgYMJdgdwSsB9jgKAQ5acDyEJy24ng8nLTgfwu18uBzC/XwYSrA7hmfCeyCHWU6Hw18Gr4R3fY5zOpy04PwEngj/KfYw9WwYSrB7BjfCW4qH6a8Kh2fwTHgF9jDLyXDSgvMzeKW8UX6Uk2Eowe45PL0m7J/D9VQ4aMG/isH/JwYbbLDBBhtssMEGG2ywtz3K/2tvDmQAAAAABvlbn+NbCSQWi8VisVgsFovFYrFYLBYvAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHVJjR5bJLd8AAAAASUVORK5CYII=';
  /* tslint:enable:max-line-length */

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private recipeService: RecipeService
  ) {
    this.createForm(); // Creates form
  }

  ngOnInit() {
    // TODO: Check data.status and data.meta.count > 0
    // Get course types
    this.recipeService.getCourseTypes().subscribe(
      (data: IResponse) => {
        this.courseTypes = data.data; // Set course types
      },
      (error: IResponse | any) => {
        this.error = true; // Set error to true
        this.loading = false; // Set loading to false
        this.errorMessage = error.message; // Set the error message
      }
    );

    // TODO: Check data.status and data.meta.count > 0
    // Check route if param is present
    this.subscription = this.route.params.subscribe((params) => {
      // Check if there is am Id
      if (params['id']) {
        this.loading = true; // Set loading to true
        this.recipeId = params['id']; // Set recipe Id
        this.buttonText = 'Update Recipe';
        this.edit = true; // Set edit to true
        // Get the recipe data to be edit
        this.recipeService.getRecipe(this.recipeId).subscribe(
          (data: IResponse) => {
            (<FormGroup>this.recipeForm).patchValue({
              type: data.data.type, // Type input field
              name: data.data.name, // Name input field
              intro: data.data.intro, // Intro input field
              image: data.data.image, // Image input field
              serves: data.data.serves, // Serves input field
              prep_time: data.data.prep_time, // Prep time input field
              cook_time: data.data.cook_time, // Cook time input field
              course_type: data.data.course_type // Course type input field
            });
            // Set ingredients field depending on type
            this.ingredients = data.data.type === 1 ?
              this.formService.populateIngredients(this.ingredients, <IIngredientFor[]>data.data.ingredients)
              : this.formService.populateArray(this.formBuilder.array([]), 'ingredients', <IIngredientSingle[]>data.data.ingredients);
            this.directions = this.formService.populateArray(this.directions, 'directions', data.data.directions); // Set directions field
            this.recipeForm.get('type').disable();
            this.loading = false; // Set loading to false
          },
          (error: IResponse | any) => {
            this.error = true; // Set error to true
            this.loading = false; // Set loading to false
            this.errorMessage = error.message; // Set the error message
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe from subscription
  }

  /**
   * Adds recipe to the database.
   */
  addRecipe(): void {
    const recipe = this.recipeForm.getRawValue();
    // Check if the form is for editing a recipe
    if (this.edit) {
      recipe.id = this.recipeId; // Set id
      this.recipeService.editRecipe(this.recipeId, recipe).subscribe(
        (data: IResponse) => {
          this.errorMessage = null;
          this.router.navigate(['/']); // Navigate to home page
        },
        (error: IResponse | any) => {
          this.errorMessage = error.message; // Set the error message
        });
    } else {
      this.recipeService.addRecipe(recipe).subscribe(
        (data: IResponse) => {
          this.errorMessage = null;
          this.router.navigate(['/']); // Navigate to home page
        },
        (error: IResponse | any) => {
          this.errorMessage = error.message; // Set the error message
        });
    }
  }

  /**
   * Creates the form with fields.
   */
  createForm(): void {
    this.directions = this.formBuilder.array([]); // Direction input field
    this.ingredients = this.formBuilder.array([]); // Ingredients input field
    this.image = this.formBuilder.control('', Validators.required); // Image input field
    this.recipeForm = this.formBuilder.group({
      type: ['99', Validators.required], // Type input field
      name: ['', Validators.required], // Name input field
      intro: [''], // Intro input field
      image: this.image, // Image input field
      serves: ['', Validators.required], // Serves input field
      prep_time: ['', Validators.required], // Prep time input field
      cook_time: ['', Validators.required], // Cook time input field
      course_type: ['Pudding', Validators.required], // Course type input field
      directions: this.directions, // Direction input field
      ingredients: this.ingredients // Ingredients input field
    });
    this.loading = false; // Set loading to false
    this.setEventChanges(); // Call set event changes
  }

  /**
   * Subscribes to ingredients form control for changes.
   */
  setEventChanges(): void {
    this.recipeForm.get('ingredients').valueChanges.subscribe((data: any) => {
      const type = this.recipeForm.get('type'); // Get type selected
      type.setValue(parseInt(type.value, 10)); // Set type to int
      // Check if data has been added to ingredients
      if (data.length) {
        type.disable(); // Disable type input field
      } else {
        type.enable(); // Enable type input field
      }
    });
  }

  /**
   * Gets the image base32 data.
   * @param event {any} Event.
   */
  getImageData(event: any): void {
    event.preventDefault(); // Prevent default
    const reader = new FileReader(); // File reader
    const file = event.target.files[0]; // Get file from target
    reader.onloadend = () => {
      this.image.setValue(reader.result); // Set input value
    }; // Onload callback function.
    reader.readAsDataURL(file); // Reads file from input
  }
}
