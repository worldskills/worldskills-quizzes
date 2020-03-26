import { TestBed } from '@angular/core/testing';

import { AttemptService } from './attempt.service';

describe('AttemptService', () => {
  let service: AttemptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttemptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
