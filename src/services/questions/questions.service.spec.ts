import {TestBed} from '@angular/core/testing';

import {QuestionsService} from './questions.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(QuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
