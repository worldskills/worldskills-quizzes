import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuestionUpdateComponent } from './quizzes-question-update.component';

describe('QuizzesQuestionUpdateComponent', () => {
  let component: QuizzesQuestionUpdateComponent;
  let fixture: ComponentFixture<QuizzesQuestionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuestionUpdateComponent ]
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
