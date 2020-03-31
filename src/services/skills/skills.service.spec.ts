import {TestBed} from '@angular/core/testing';

import {SkillsService} from './skills.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SkillsService', () => {
  let service: SkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
