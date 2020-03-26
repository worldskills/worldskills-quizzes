import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuizComponent } from './quizzes-quiz.component';

describe('QuizzesQuizComponent', () => {
  let component: QuizzesQuizComponent;
  let fixture: ComponentFixture<QuizzesQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
