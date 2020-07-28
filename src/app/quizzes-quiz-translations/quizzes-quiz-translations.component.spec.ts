import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuizTranslationsComponent} from './quizzes-quiz-translations.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {mockQuizFactory} from '../../test';

describe('QuizzesQuizTranslationsComponent', () => {
  let component: QuizzesQuizTranslationsComponent;
  let fixture: ComponentFixture<QuizzesQuizTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuizTranslationsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizTranslationsComponent);
    component = fixture.componentInstance;
    component.quiz = mockQuizFactory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
