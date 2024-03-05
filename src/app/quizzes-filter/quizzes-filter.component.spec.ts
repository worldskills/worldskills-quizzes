import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesFilterComponent } from './quizzes-filter.component';

describe('QuizzesFilterComponent', () => {
  let component: QuizzesFilterComponent;
  let fixture: ComponentFixture<QuizzesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
