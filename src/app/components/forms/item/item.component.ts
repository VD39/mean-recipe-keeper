import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  item: FormGroup;

  @Input()
  index: number;

  @Input()
  value: string;

  @Output()
  delete = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
