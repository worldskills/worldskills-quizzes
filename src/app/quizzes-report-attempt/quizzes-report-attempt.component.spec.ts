import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesReportAttemptComponent } from './quizzes-report-attempt.component';

describe('QuizzesReportAttemptComponent', () => {
  let component: QuizzesReportAttemptComponent;
  let fixture: ComponentFixture<QuizzesReportAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzesReportAttemptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesReportAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
