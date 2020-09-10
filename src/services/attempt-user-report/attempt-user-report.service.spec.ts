import {TestBed} from '@angular/core/testing';

import {AttemptUserReportService} from './attempt-user-report.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AttemptUserReportService', () => {
  let service: AttemptUserReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AttemptUserReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
