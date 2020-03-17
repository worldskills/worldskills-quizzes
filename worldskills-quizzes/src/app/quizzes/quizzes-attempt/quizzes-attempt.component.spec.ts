import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesAttemptComponent } from './quizzes-attempt.component';

describe('QuizzesAttemptComponent', () => {
  let component: QuizzesAttemptComponent;
  let fixture: ComponentFixture<QuizzesAttemptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesAttemptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
