import {TestBed} from '@angular/core/testing';

import {QuizzesService} from './quizzes.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('QuizzesService', () => {
  let service: QuizzesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(QuizzesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
