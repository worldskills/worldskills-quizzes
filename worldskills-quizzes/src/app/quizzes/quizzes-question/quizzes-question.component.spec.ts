import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuestionComponent } from './quizzes-question.component';

describe('QuizzesQuestionComponent', () => {
  let component: QuizzesQuestionComponent;
  let fixture: ComponentFixture<QuizzesQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
