import { Injectable } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable()
export class FormService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  addFormControl(prop?: string): FormControl {
    const item = prop ? prop : '';
    return new FormControl(item);
  }

  addFormGroup(prop?: any): FormGroup {
    const quantity = prop ? prop.quantity : '';
    const ingredient = prop ? prop.ingredient : '';

    return this.formBuilder.group({
      quantity: [quantity, Validators.required],
      ingredient: [ingredient, Validators.required],
    })
  }

  addIngredientsFormGroup(prop?: any): FormGroup {
    const _for = prop ? prop.for : '';
    const ingredients = prop ? this.populateArray(this.formBuilder.array([]), 'ingredients', prop.ingredients) : new FormArray([]);

    return this.formBuilder.group({
      for: [_for, Validators.required],
      ingredients
    })
  }

  populateArray(array: FormArray, value: string, props?: any): FormArray {
    const formArray: FormArray = <FormArray>array;

    if (value.toLowerCase() === 'directions') {
      if (props) {
        props.forEach((prop) => {
          formArray.push(
            this.addFormControl(prop)
          );
        });
      } else {
        formArray.push(
          this.addFormControl()
        );
      }
    } else {
      if (props) {
        props.forEach((prop) => {
          formArray.push(
            this.addFormGroup(prop)
          );
        });
      } else {
        formArray.push(
          this.addFormGroup()
        );
      }
    }

    return formArray;
  }

  populateIngredients(array: FormArray, type?: number, props?: any): FormArray {
    let formArray: FormArray = <FormArray>array;
    if (props) {
      if (type === 1) {
        props.forEach((prop) => {
          formArray.push(
            this.addIngredientsFormGroup(prop)
          );
        });
      } else {
        return this.populateArray(this.formBuilder.array([]), 'ingredients', props);
      }
    } else {
      formArray.push(
        this.addIngredientsFormGroup()
      );
    }

    return formArray;
  }
}
