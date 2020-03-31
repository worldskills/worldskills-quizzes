import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuestionFormComponent} from './quizzes-question-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {mockQuizFactory} from '../../../test';

describe('QuizzesQuestionFormComponent', () => {
  let component: QuizzesQuestionFormComponent;
  let fixture: ComponentFixture<QuizzesQuestionFormComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuestionFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{provide: FormBuilder, useValue: formBuilder}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuestionFormComponent);
    component = fixture.componentInstance;
    component.quiz = mockQuizFactory();
    component.form = formBuilder.group({
      question: null,
      answers: null
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
