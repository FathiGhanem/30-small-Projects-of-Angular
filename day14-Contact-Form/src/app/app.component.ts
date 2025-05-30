import { Component } from '@angular/core';
import { ConatctFormComponent } from "./conatct-form/conatct-form.component";

@Component({
  selector: 'app-root',
  imports: [ConatctFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
