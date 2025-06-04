import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextTransform]',
})
export class TextTransformDirective {
  @Input() transformType: 'uppercase' | 'lowercase' = 'uppercase';

  constructor(private el: ElementRef, private render: Renderer2) {}
  private setTextTransformType(text: string) {
    if (this.transformType === 'uppercase') {
      this.render.setProperty(
        this.el.nativeElement,
        'innerText',
        text.toUpperCase()
      );
    } else {
      this.render.setProperty(
        this.el.nativeElement,
        'innerText',
        text.toLowerCase()
      );
    }
  }

  ngOnInit(){
    const text = this.el.nativeElement.innerText;
    this.setTextTransformType(text);
  }
}
