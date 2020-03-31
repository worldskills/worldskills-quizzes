import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesTranslationCreateComponent} from './quizzes-translation-create.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('QuizzesTranslationCreateComponent', () => {
  let component: QuizzesTranslationCreateComponent;
  let fixture: ComponentFixture<QuizzesTranslationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesTranslationCreateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesTranslationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
