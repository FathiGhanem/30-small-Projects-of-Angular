import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      console.log('Clicked inside the element!');
    }else{
      console.log('Clicked outside the element!');
    }
  }
}
