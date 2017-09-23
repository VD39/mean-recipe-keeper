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
import { FormService } from '../../../services/form.service';

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
    private formService: FormService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  add(event: Event): void {
    event.preventDefault();
    this.itemArray = this.formService.populateArray(this.itemArray, this.value);
  }

  delete(event: Event, index: number): void {
    event.preventDefault();
    const formControl = <FormArray>this.itemArray;
    formControl.removeAt(index);
  }
}
