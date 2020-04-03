import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesTranslationFormComponent} from './quizzes-translation-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {mockQuizFactory} from '../../../test';

describe('QuizzesTranslationFormComponent', () => {
  let component: QuizzesTranslationFormComponent;
  let fixture: ComponentFixture<QuizzesTranslationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesTranslationFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesTranslationFormComponent);
    component = fixture.componentInstance;
    component.quiz = mockQuizFactory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
