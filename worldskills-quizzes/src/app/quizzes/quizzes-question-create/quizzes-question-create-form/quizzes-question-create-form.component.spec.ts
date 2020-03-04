import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuestionCreateFormComponent } from './quizzes-question-create-form.component';

describe('QuizzesQuestionCreateFormComponent', () => {
  let component: QuizzesQuestionCreateFormComponent;
  let fixture: ComponentFixture<QuizzesQuestionCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuestionCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuestionCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
