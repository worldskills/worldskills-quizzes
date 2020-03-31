import {TestBed} from '@angular/core/testing';

import {AnswersService} from './answers.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AnswersService', () => {
  let service: AnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
