import { Component } from '@angular/core';
import { WatherComponent } from "./wather/wather.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [WatherComponent]
})
export class AppComponent {

}
