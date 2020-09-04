import { TestBed } from '@angular/core/testing';

import { AttemptQuestionService } from './attempt-question.service';

describe('AttemptQuestionService', () => {
  let service: AttemptQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttemptQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
