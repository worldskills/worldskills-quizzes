import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesTranslationCreateFormComponent } from './quizzes-translation-create-form.component';

describe('QuizzesTranslationCreateFormComponent', () => {
  let component: QuizzesTranslationCreateFormComponent;
  let fixture: ComponentFixture<QuizzesTranslationCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesTranslationCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesTranslationCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
