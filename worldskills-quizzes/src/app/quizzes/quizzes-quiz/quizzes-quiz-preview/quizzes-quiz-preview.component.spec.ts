import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuizPreviewComponent } from './quizzes-quiz-preview.component';

describe('QuizzesQuizPreviewComponent', () => {
  let component: QuizzesQuizPreviewComponent;
  let fixture: ComponentFixture<QuizzesQuizPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuizPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
