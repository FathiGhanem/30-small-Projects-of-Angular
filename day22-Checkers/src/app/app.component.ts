import { Component } from '@angular/core';
import { CheckersComponent } from "./components/checkers/checkers.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CheckersComponent],
})
export class AppComponent {

}
