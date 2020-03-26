import { TestBed } from '@angular/core/testing';

import { AnswersService } from './answers.service';

describe('AnswersService', () => {
  let service: AnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
