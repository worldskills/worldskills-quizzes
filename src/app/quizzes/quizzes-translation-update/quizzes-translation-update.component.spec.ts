import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesTranslationUpdateComponent} from './quizzes-translation-update.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('QuizzesTranslationComponent', () => {
  let component: QuizzesTranslationUpdateComponent;
  let fixture: ComponentFixture<QuizzesTranslationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesTranslationUpdateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
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
