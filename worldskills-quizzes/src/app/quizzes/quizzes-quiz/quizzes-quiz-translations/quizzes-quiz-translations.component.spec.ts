import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuizTranslationsComponent } from './quizzes-quiz-translations.component';

describe('QuizzesQuizTranslationsComponent', () => {
  let component: QuizzesQuizTranslationsComponent;
  let fixture: ComponentFixture<QuizzesQuizTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesQuizTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
