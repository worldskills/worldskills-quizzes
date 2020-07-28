import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuizCreateComponent} from './quizzes-quiz-create.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('QuizzesQuizCreateComponent', () => {
  let component: QuizzesQuizCreateComponent;
  let fixture: ComponentFixture<QuizzesQuizCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuizCreateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
