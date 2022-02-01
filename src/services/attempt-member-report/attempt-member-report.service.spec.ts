import { TestBed } from '@angular/core/testing';

import { AttemptMemberReportService } from './attempt-member-report.service';

describe('AttemptMemberReportService', () => {
  let service: AttemptMemberReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttemptMemberReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
