import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizzesQuizFormComponent} from './quizzes-quiz-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';

describe('QuizzesQuizFormComponent', () => {
  let component: QuizzesQuizFormComponent;
  let fixture: ComponentFixture<QuizzesQuizFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesQuizFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
