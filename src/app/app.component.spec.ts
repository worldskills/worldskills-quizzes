import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {NgAuthService, WorldskillsAngularLibModule} from '@worldskills/worldskills-angular-lib';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceTestingProvider, TranslationMockPipe} from '../test';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      declarations: [AppComponent, TranslationMockPipe],
      providers: [
        {provide: NgAuthService, useValue: {currentUser: {subscribe: () => undefined}}},
        TranslateServiceTestingProvider
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
