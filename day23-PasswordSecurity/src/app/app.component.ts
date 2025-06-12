import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { PasswordExplanationComponent } from './components/password-explanation/password-explanation.component';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HeaderComponent,
    PasswordGeneratorComponent,
    PasswordExplanationComponent,
  ],
})
export class AppComponent {}
