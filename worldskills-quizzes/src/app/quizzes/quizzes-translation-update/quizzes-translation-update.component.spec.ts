import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesTranslationUpdateComponent } from './quizzes-translation-update.component';

describe('QuizzesTranslationComponent', () => {
  let component: QuizzesTranslationUpdateComponent;
  let fixture: ComponentFixture<QuizzesTranslationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesTranslationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesTranslationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
