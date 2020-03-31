import {TestBed} from '@angular/core/testing';

import {QuestionService} from './question.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
