import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesTranslationCreateComponent } from './quizzes-translation-create.component';

describe('QuizzesTranslationCreateComponent', () => {
  let component: QuizzesTranslationCreateComponent;
  let fixture: ComponentFixture<QuizzesTranslationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesTranslationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesTranslationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
