import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  @Input()
  formArrayxx: FormArray;

  @Input()
  parentFormGroup: FormGroup;

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  initIngrediants(): FormGroup {
    return this.formBuilder.group({
      for: ['', Validators.required],
      ingredients: new FormArray([])
    });
  }

  add(event: Event): void {
    event.preventDefault();
    this.formArrayxx = this.formService.populateIngredients(this.formArrayxx);
  }

  delete(event: Event, index: number): void {
    event.preventDefault();
    const formControl = <FormArray>this.formArrayxx;
    formControl.removeAt(index);
  }
}
