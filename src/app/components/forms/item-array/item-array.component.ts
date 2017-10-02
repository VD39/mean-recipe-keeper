// Import dependencies
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

// Import services
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-item-array',
  templateUrl: './item-array.component.html',
  styleUrls: ['./item-array.component.css']
})

export class ItemArrayComponent {
  @Input()
  public parentFormGroup: FormGroup; // Parents form group

  @Input()
  public formArray: FormArray; // Form array

  @Input()
  public value: string; // Field value

  constructor(
    private formService: FormService
  ) { }

  /**
   * Adds item to form array.
   * @param event {Event} Event.
   */
  add(event: Event): void {
    event.preventDefault(); // Prevent default
    this.formArray = this.formService.populateArray(this.formArray, this.value); // Add to form array
  }

  /**
   * Deletes item to form array.
   * @param event {Event} Event.
   * @param index {number} Index of the ingredient.
   */
  delete(event: Event, index: number): void {
    event.preventDefault(); // Prevent default
    const formArray = <FormArray>this.formArray; // Set form control
    formArray.removeAt(index); // Remove item from array
  }
}
