import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCoursesComponent } from './find-courses.component';

describe('FindCoursesComponent', () => {
  let component: FindCoursesComponent;
  let fixture: ComponentFixture<FindCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
