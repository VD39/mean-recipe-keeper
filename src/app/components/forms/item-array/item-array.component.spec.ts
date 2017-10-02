import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemArrayComponent } from './item-array.component';

describe('ItemArrayComponent', () => {
  let component: ItemArrayComponent;
  let fixture: ComponentFixture<ItemArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
