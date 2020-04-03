import {TestBed} from '@angular/core/testing';

import {AttemptsService} from './attempts.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AttemptsService', () => {
  let service: AttemptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AttemptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
