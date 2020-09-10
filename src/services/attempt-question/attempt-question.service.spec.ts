import {TestBed} from '@angular/core/testing';

import {AttemptQuestionService} from './attempt-question.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AttemptQuestionService', () => {
  let service: AttemptQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AttemptQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
