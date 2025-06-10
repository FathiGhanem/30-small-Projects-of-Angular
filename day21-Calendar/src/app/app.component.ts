import { Component } from '@angular/core';
import { CalendarPageComponent } from "./components/calendar-page/calendar-page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CalendarPageComponent]
})
export class AppComponent {
}
