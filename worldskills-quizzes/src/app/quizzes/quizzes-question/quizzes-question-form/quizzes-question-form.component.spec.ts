import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuestionFormComponent } from './quizzes-question-form.component';

describe('QuizzesQuestionFormComponent', () => {
  let component: QuizzesQuestionFormComponent;
  let fixture: ComponentFixture<QuizzesQuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
