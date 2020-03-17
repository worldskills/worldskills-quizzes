import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesTranslationComponent } from './quizzes-translation.component';

describe('QuizzesTranslationComponent', () => {
  let component: QuizzesTranslationComponent;
  let fixture: ComponentFixture<QuizzesTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createInstance', () => {
    expect(component).toBeTruthy();
  });
});
