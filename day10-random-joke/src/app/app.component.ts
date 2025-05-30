import { Component } from '@angular/core';
import { JokeComponent } from "./joke/joke.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [JokeComponent]
})
export class AppComponent {
}
