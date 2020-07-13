import {CkEditorDirective} from './ck-editor.directive';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

@Component({
  template: `<textarea [appCkEditor]>Some value</textarea>`
})
class TestComponent {
}

describe('CkEditorDirective', () => {

  let fixture;
  let element;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CkEditorDirective, TestComponent],
      imports: [HttpClientTestingModule]
    }).createComponent(TestComponent);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.directive(CkEditorDirective));
  });

  it('should create an instance', () => {
    expect(element).toBeTruthy();
  });
});
