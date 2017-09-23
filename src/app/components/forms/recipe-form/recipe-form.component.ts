import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { RecipeService } from '../../../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRecipe } from '../../../models/recipe.interface';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  loading: boolean = true;
  recipeId: string;
  edit: boolean = false;
  recipe: any;
  sub: Subscription;
  courseTypes: any;
  errorMessage: any;
  error: boolean = false;
  recipeForm: FormGroup;
  image: FormControl;
  directions: FormArray;
  ingredients: FormArray;
  defaultImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAMcAQMAAACl5F6MAAAABlBMVEW8vsDn6OnyCdevAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEbUlEQVR4AezBMQEAAADCoPVP7WsIoAcAAAAAAAAAAAAAAAAAAAAAAIydO0iOk4eCAGyVXNEuukF0FB1NHE1H0RG0ZEHRf5A99WYMk1T+Kvolw+vVjBf+CkMLoRCFWQkuqCquB3QOOQKrCpwBKJ1i6Jxk/EzTubaArgAHQOeyjhu8aMEafUrYolLjLRMfLrpw5cMYadeBnTLcrwN7ZXi+DhyuCi8GG/xy8Gyw3SRe7n7cLzfnajah5z87keFJ//lYf0WAAq+vv+rDX+fir+zpr2Xqr95qrle/ywr9OxX+/nF19fGRmR/yrzCJCudRqNHiNDHhIlquTBgCF2aX3V2BwYT9nUYdNoNojnqjiKJ56q0xiRaok4EsWqQO2EW0RJ3wQbTMvDc6iFaYswEvkx5Hnf8E0Tx1xhcfj3gh1lhOLHVWnx8vLvBq/FAnYpGBhwEElVfjhyETjVjj5bFanATpLrHIcpDkIstpJRdZLmRykaW63CLLMZKLLGeVXGS5jvlFluZKq8k1lnGMXGMZuck1lnsVu8ZydybXWOYj5BrLDIxcY5lz8mrML/JupPIC02osf3tyjeVqY9dYikys8QlTAUIsFovFYrFYLJaIP8hq8D4GG2ywwQYbbLDBBhtssMEGG2ywwQYb3N9+G/ePwQYbbLDBBhtssMEGG5yhA3ugqcARmFXgDKwqcAGgAsu+J1zYy94UXDjIRxosH+crwUm2euHCWX43Fy7YciUYI9N1YIeRavDpsMdIM9jgs+BOh4PBavA3ras6aMFRC06TEpyrLsy/H5emBKOrwvxZpsOsA3ssOk8SQQ9edZ4WI6DzfJwU4Ym/FCE7ofFXfQoJlnUugRsHdl9GTKBzlxRF6vzVW9kngr5eLTB5hT6MUhPgLfdDRhwQCQ79TQXe756tAWcp10XgIuMYF8aWxoedLtz5sB/wzIeDLrzw4QiRqHBSgOvnwLWFCrc7eCLCbnwrXFh2ZMdHKhEOyx3ciHBch8OHE2TtCZ0IZ0wCz1S4jhGTDhc0ecN9IcLja/qEVwIswqwC+/H3zfgMDw7j95cbPBFg+YEKnIaGWyoNzpvmcEujws0rwGX7LnCnwWOgDLhlZsFuaJEP+zFCC7yw4DCAhFtWFhwHl/lwwpeowRMJzlpw+QpXEgwl2O3gxoH9Du4cOOzgmQNHLTjt4OXF4byDVw5csAsHhhLssM/EgD32qQw4aMER+zQtuDPgpAVn7DMz4IJ9FgYMJdgdwSsB9jgKAQ5acDyEJy24ng8nLTgfwu18uBzC/XwYSrA7hmfCeyCHWU6Hw18Gr4R3fY5zOpy04PwEngj/KfYw9WwYSrB7BjfCW4qH6a8Kh2fwTHgF9jDLyXDSgvMzeKW8UX6Uk2Eowe45PL0m7J/D9VQ4aMG/isH/JwYbbLDBBhtssMEGG2ywtz3K/2tvDmQAAAAABvlbn+NbCSQWi8VisVgsFovFYrFYLBYvAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHVJjR5bJLd8AAAAASUVORK5CYII=';

  constructor(
    private formService: FormService,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.recipeService.getCourseTypes().subscribe(
      (data) => {
        this.courseTypes = data.data;
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
      }
    );

    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.recipeId = params['id'];
        this.edit = true;
        this.recipeService.getRecipe(this.recipeId).subscribe(
          (data) => {
            this.recipe = data.data;
            (<FormGroup>this.recipeForm).patchValue({
              type: this.recipe.type,
              name: this.recipe.name,
              intro: this.recipe.intro,
              image: this.recipe.image,
              yields: this.recipe.yields,
              prep_time: this.recipe.prep_time,
              cook_time: this.recipe.cook_time,
              course_type: this.recipe.course_type
            });
            this.ingredients = this.formService.populateIngredients(this.ingredients, this.recipe.type, this.recipe.ingredients);
            this.directions = this.formService.populateArray(this.directions, 'directions', this.recipe.directions);
            this.loading = false;
          },
          (error) => {
            this.error = true;
            this.errorMessage = error.message;
          }
        );
      }
    });
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addRecipe(): void {
    if (this.edit) {
      let recipe = this.recipeForm.getRawValue();
      recipe.id = this.recipeId;
      this.recipeService.editRecipe(this.recipeId, recipe).subscribe(
        (data) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = true;
          this.errorMessage = error.message;
        });
    } else {
      this.recipeService.addRecipe(this.recipeForm.getRawValue()).subscribe(
        (data) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = true;
          this.errorMessage = error.message;
        });
    }
  }

  createForm(): void {
    this.directions = this.formBuilder.array([]);
    this.ingredients = this.formBuilder.array([]);
    this.image = this.formBuilder.control('', Validators.required);
    this.recipeForm = this.formBuilder.group({
      type: ['99', Validators.required],
      name: ['', Validators.required],
      intro: ['', Validators.required],
      image: this.image,
      yields: ['', Validators.required],
      prep_time: ['', Validators.required],
      cook_time: ['', Validators.required],
      course_type: ['Pudding', Validators.required],
      directions: this.directions,
      ingredients: this.ingredients
    });
    this.loading = false;
    this.setEventChanges();
  }

  setEventChanges(): void {
    this.recipeForm.get('ingredients').valueChanges.subscribe((data) => {
      const type = this.recipeForm.get('type');
      type.setValue(parseInt(type.value, 10));
      if (data.length) {
        type.disable();
      } else {
        type.enable();
      }
    });
  }

  getImageData(event: any): void {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.image.setValue(reader.result);
    };
    reader.readAsDataURL(file);
  }
}
