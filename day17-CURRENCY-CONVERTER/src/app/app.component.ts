import { Component } from '@angular/core';
import { CurrencyConverterComponent } from "./currency-converter/currency-converter.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CurrencyConverterComponent]
})
export class AppComponent {

}
