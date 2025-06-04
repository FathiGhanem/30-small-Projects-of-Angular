import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FoucusOnDirective } from './directives/foucus-on.directive';
import { HoverLighlightDirective } from './directives/hover-lighlight.directive';
import { TextTransformDirective } from './directives/text-transform.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    ClickOutsideDirective,
    FoucusOnDirective,
    HoverLighlightDirective,
    TextTransformDirective,
  ],
})
export class AppComponent {}
