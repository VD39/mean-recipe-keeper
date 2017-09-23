import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  host: {'class': 'field'},
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input()
  parentFormGroup: FormGroup;

  @Input()
  isRequired: any;

  @Input()
  controlName: any;

  @Input()
  labelName: any;

  @Input()
  type: any;
}
