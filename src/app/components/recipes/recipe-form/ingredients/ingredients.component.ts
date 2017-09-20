import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

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
    const control = <FormArray>this.formArrayxx;
    control.push(this.initIngrediants());
  }

  delete(event: Event, index: number): void {
    event.preventDefault();
    var formControl = <FormArray>this.formArrayxx;
    formControl.removeAt(index);
  }


  addIngrediant(event: Event, form: FormArray): void {
    event.preventDefault();
    const control = <FormArray>form;
    control.push(new FormControl(''));
  }

  deleteIngrediant(event: Event, index: number, form: FormArray): void {
    event.preventDefault();
    var formControl = <FormArray>form;
    formControl.removeAt(index);
  }




}
