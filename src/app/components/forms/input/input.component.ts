// Import dependencies
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent {
  @Input()
  public parentFormGroup: FormGroup; // Parent form group

  @Input()
  public isRequired: any; // If input is required

  @Input()
  public controlName: any; // Control name for input

  @Input()
  public labelName: any; // The input lable name

  @Input()
  public type: any; // Input type
}
