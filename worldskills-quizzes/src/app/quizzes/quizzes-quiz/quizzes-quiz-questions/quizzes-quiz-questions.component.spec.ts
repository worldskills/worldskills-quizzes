import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuizQuestionsComponent } from './quizzes-quiz-questions.component';

describe('QuizzesQuizQuestionsComponent', () => {
  let component: QuizzesQuizQuestionsComponent;
  let fixture: ComponentFixture<QuizzesQuizQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuizQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
