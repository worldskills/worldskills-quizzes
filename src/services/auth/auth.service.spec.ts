import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WorldskillsAngularLibModule} from '@worldskills/worldskills-angular-lib';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, WorldskillsAngularLibModule],
      providers: [{provide: AuthService, useValue: {}}],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
