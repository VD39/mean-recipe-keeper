import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTypeComponent } from './course-type.component';

describe('CourseTypeComponent', () => {
  let component: CourseTypeComponent;
  let fixture: ComponentFixture<CourseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
