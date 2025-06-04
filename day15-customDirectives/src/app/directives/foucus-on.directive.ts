import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFoucusOn]'
})
export class FoucusOnDirective {

  constructor(private el:ElementRef,private render:Renderer2) { }

 ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

}
