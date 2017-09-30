// Import dependencies
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

// Import services
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})

export class IngredientsComponent {
  @Input()
  public parentFormGroup: FormGroup; // Parents form group

  @Input()
  public formArrayxx: FormArray; // Form array

  constructor(
    private formService: FormService
  ) { }

  /**
   * Adds ingredient to form array.
   * @param event {Event} Event
   */
  add(event: Event): void {
    event.preventDefault(); // Prevent default
    this.formArrayxx = this.formService.populateIngredients(this.formArrayxx); // Add to form array
  }

  /**
   * Deletes ingredient to form array.
   * @param event {Event} Event
   * @param index {number} Index of the ingredient
   */
  delete(event: Event, index: number): void {
    event.preventDefault(); // Prevent default
    const formArray = <FormArray>this.formArrayxx; // Set form control
    formArray.removeAt(index); // Remove item from array
  }
}
