import {TestBed} from '@angular/core/testing';
import {AnswerService} from './answer.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
