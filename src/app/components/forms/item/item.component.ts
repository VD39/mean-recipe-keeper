// Import dependencies
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  @Input()
  public item: FormGroup; // Parent form group

  @Input()
  public index: number; // Index for the input

  @Input()
  public value: string; // Value for the input

  @Output()
  public delete = new EventEmitter(); // Event emitter to delete from array
}
