import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-item-array',
  templateUrl: './item-array.component.html',
  styleUrls: ['./item-array.component.css']
})
export class ItemArrayComponent implements OnInit {
  @Input()
  itemArray: FormArray;

  @Input()
  parentsFormGroup: FormGroup;

  @Input()
  value: string;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  add(event: Event): void {
    event.preventDefault();
    var formControl = < FormArray > this.itemArray;

    if (this.value === 'Directions') {
      formControl.push(new FormControl(''));
    } else {
      formControl.push(this.formBuilder.group({
        quantity: ['', Validators.required],
        ingredient: ['', Validators.required],
      }));
    }
  }

  delete(event: Event, index: number): void {
    event.preventDefault();
    var formControl = < FormArray > this.itemArray;
    formControl.removeAt(index);
  }
}
