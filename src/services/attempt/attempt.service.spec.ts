import {TestBed} from '@angular/core/testing';

import {AttemptService} from './attempt.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AttemptService', () => {
  let service: AttemptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AttemptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
