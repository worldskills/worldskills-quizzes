import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuizUpdateComponent } from './quizzes-quiz-update.component';

describe('QuizzesQuizUpdateComponent', () => {
  let component: QuizzesQuizUpdateComponent;
  let fixture: ComponentFixture<QuizzesQuizUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuizUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
