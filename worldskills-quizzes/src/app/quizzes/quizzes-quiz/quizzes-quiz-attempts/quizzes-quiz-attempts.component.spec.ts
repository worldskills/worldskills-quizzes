import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuizAttemptsComponent } from './quizzes-quiz-attempts.component';

describe('QuizzesQuizAttemptsComponent', () => {
  let component: QuizzesQuizAttemptsComponent;
  let fixture: ComponentFixture<QuizzesQuizAttemptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuizAttemptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
