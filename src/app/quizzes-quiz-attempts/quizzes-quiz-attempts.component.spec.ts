import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuizAttemptsComponent} from './quizzes-quiz-attempts.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('QuizzesQuizAttemptsComponent', () => {
  let component: QuizzesQuizAttemptsComponent;
  let fixture: ComponentFixture<QuizzesQuizAttemptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuizAttemptsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
