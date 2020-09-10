import {TestBed} from '@angular/core/testing';

import {LocaleContextService} from './locale-context.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceTestingProvider} from '../../test';

describe('LocaleContextService', () => {
  let service: LocaleContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateServiceTestingProvider],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LocaleContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
