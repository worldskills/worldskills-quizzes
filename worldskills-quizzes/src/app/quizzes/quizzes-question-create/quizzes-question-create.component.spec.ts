import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuestionCreateComponent } from './quizzes-question-create.component';

describe('QuizzesQuestionCreateComponent', () => {
  let component: QuizzesQuestionCreateComponent;
  let fixture: ComponentFixture<QuizzesQuestionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuestionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
