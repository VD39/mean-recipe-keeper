import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminButtonsComponent } from './admin-buttons.component';

describe('AdminButtonsComponent', () => {
  let component: AdminButtonsComponent;
  let fixture: ComponentFixture<AdminButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
