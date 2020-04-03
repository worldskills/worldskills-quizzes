import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuestionUpdateComponent} from './quizzes-question-update.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('QuizzesQuestionUpdateComponent', () => {
  let component: QuizzesQuestionUpdateComponent;
  let fixture: ComponentFixture<QuizzesQuestionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuestionUpdateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuestionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
