import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverLighlight]',
})
export class HoverLighlightDirective {
  @Input() highlightColor: string = 'yellow';
  @Input() defaultColor: string = 'transparent';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private setBackGroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
  @HostListener('mouseenter') onMouseEnter(){
    this.setBackGroundColor(this.highlightColor);
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.setBackGroundColor(this.defaultColor);
  }
}
