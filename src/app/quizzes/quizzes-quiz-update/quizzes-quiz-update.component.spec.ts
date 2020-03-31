import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuizUpdateComponent} from './quizzes-quiz-update.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('QuizzesQuizUpdateComponent', () => {
  let component: QuizzesQuizUpdateComponent;
  let fixture: ComponentFixture<QuizzesQuizUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuizUpdateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
