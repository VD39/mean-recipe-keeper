// Import dependencies
import { Injectable } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

// Import interfaces
import { IIngredientSingle, IIngredientFor } from '../interfaces';

@Injectable()
export class FormService {
  constructor(
    private formBuilder: FormBuilder
  ) { }

  /**
   * Adds prop if set else empty string, to the form control.
   * @param prop {string} Form control item
   */
  private addFormControl(prop?: string): FormControl {
    const item = prop ? prop : ''; // Set item
    return new FormControl(item); // Return form control with item
  }

  /**
   * Adds prop if set else empty string, to the form group.
   * @param prop {IIngredientSingle} Form group item
   */
  private addFormGroup(prop?: IIngredientSingle): FormGroup {
    const quantity = prop ? prop.quantity : ''; // Set quantity
    const ingredient = prop ? prop.ingredient : ''; // Set ingredient

    return this.formBuilder.group({
      quantity: [quantity, Validators.required],
      ingredient: [ingredient, Validators.required],
    }); // Return form group with quantity and ingredient
  }

  /**
   * Adds prop if set else empty string and array, to the form group.
   * @param prop {IIngredientFor} Form group item
   */
  private addIngredientsFormGroup(prop?: IIngredientFor): FormGroup {
    const _for = prop ? prop.for : ''; // Set _for
    const ingredients = prop ?
      this.populateArray(this.formBuilder.array([]), 'ingredients', prop.ingredients)
      : new FormArray([]); // Set ingredients

    return this.formBuilder.group({
      for: [_for, Validators.required],
      ingredients
    }); // Return form group with _for and ingredients
  }

  /**
   * Adds prop if set else empty array, to the form array.
   * @param array {FormArray}
   * @param value {string}
   * @param props {(string | IIngredientSingle)[]}
   */
  public populateArray(array: FormArray, value: string, props?: (string | IIngredientSingle)[]): FormArray {
    const formArray: FormArray = <FormArray>array; // Form array

    // Check if directions
    if (value.toLowerCase() === 'directions') {
      // Check if props are set, if set loop over props and push to form array
      if (props) {
        props.forEach((prop: string) => {
          formArray.push(
            this.addFormControl(prop)
          ); // Add to form array
        });
      } else {
        formArray.push(
          this.addFormControl()
        ); // Add to form array
      }
    } else {
      // Check if props are set, if set loop over props and push to form array
      if (props) {
        props.forEach((prop: IIngredientSingle) => {
          formArray.push(
            this.addFormGroup(prop)
          ); // Add to form array
        });
      } else {
        formArray.push(
          this.addFormGroup()
        ); // Add to form array
      }
    }

    return formArray; // Return form array
  }

  /**
   * Adds prop if set else empty array, to the form array.
   * @param array {FormArray}
   * @param props {IIngredientFor}
   */
  public populateIngredients(array: FormArray, props?: IIngredientFor[]): FormArray {
    const formArray: FormArray = <FormArray>array;
    // Check if props are set, if set loop over props and push to form array
    if (props) {
      props.forEach((prop) => {
        formArray.push(
          this.addIngredientsFormGroup(prop)
        ); // Add to form array
      });
    } else {
      formArray.push(
        this.addIngredientsFormGroup()
      ); // Add to form array
    }

    return formArray; // Return form array
  }
}
