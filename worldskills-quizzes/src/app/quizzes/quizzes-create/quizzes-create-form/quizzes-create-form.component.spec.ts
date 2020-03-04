import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesCreateFormComponent } from './quizzes-create-form.component';

describe('QuizzesCreateFormComponent', () => {
  let component: QuizzesCreateFormComponent;
  let fixture: ComponentFixture<QuizzesCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
