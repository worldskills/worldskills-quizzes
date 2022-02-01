import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesReportComponent } from './quizzes-report.component';

describe('QuizzesReportComponent', () => {
  let component: QuizzesReportComponent;
  let fixture: ComponentFixture<QuizzesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
