import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appCkEditor]'
})
export class CkEditorDirective implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    console.log(this.elementRef.nativeElement);
  }

}
