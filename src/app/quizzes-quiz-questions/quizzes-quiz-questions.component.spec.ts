import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuizQuestionsComponent} from './quizzes-quiz-questions.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('QuizzesQuizQuestionsComponent', () => {
  let component: QuizzesQuizQuestionsComponent;
  let fixture: ComponentFixture<QuizzesQuizQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuizQuestionsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
