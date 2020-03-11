import { TestBed } from '@angular/core/testing';

import { AttemptsService } from './attempts.service';

describe('AttemptsService', () => {
  let service: AttemptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttemptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
