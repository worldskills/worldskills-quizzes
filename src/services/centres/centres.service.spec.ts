import { TestBed } from '@angular/core/testing';

import { CentresService } from './centres.service';

describe('CentresService', () => {
  let service: CentresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
