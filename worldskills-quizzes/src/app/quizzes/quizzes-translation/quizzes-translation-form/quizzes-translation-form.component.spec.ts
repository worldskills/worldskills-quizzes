import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesTranslationFormComponent } from './quizzes-translation-form.component';

describe('QuizzesTranslationFormComponent', () => {
  let component: QuizzesTranslationFormComponent;
  let fixture: ComponentFixture<QuizzesTranslationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesTranslationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesTranslationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
