import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuizAttemptsUserComponent} from './quizzes-quiz-attempts-user.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('QuizzesQuizAttemptsUserComponent', () => {
  let component: QuizzesQuizAttemptsUserComponent;
  let fixture: ComponentFixture<QuizzesQuizAttemptsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuizAttemptsUserComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizAttemptsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
