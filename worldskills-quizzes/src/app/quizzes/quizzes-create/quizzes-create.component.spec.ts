import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesCreateComponent } from './quizzes-create.component';

describe('QuizzesCreateComponent', () => {
  let component: QuizzesCreateComponent;
  let fixture: ComponentFixture<QuizzesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
