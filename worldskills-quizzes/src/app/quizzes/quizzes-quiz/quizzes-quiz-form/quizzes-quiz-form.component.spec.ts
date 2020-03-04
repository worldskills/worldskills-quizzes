import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuizFormComponent } from './quizzes-quiz-form.component';

describe('QuizzesQuizFormComponent', () => {
  let component: QuizzesQuizFormComponent;
  let fixture: ComponentFixture<QuizzesQuizFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuizFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
