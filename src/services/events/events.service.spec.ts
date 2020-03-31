import {TestBed} from '@angular/core/testing';

import {EventsService} from './events.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
