import { TestBed } from '@angular/core/testing';

import { AttemptUserReportService } from './attempt-user-report.service';

describe('AttemptUserReportService', () => {
  let service: AttemptUserReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttemptUserReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
